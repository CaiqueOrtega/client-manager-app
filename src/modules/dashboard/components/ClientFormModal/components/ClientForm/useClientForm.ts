'use client';

import { useState, useCallback } from 'react';
import { z } from 'zod';
import { ClientService } from '@/lib/firebase/service/client/browser';
import { Client, CreateClient, Plans, Status } from '@/lib/firebase/service/client/browser/types';
import { clientSchema } from '@/modules/dashboard/components/ClientFormModal/components/ClientForm/schemas';
import { useAuthContext } from '@/modules/dashboard/context/AuthProvider';
import { useDashboardContext } from '@/modules/dashboard/context/DashboardProvider';

export function useClientForm(onClose?: () => void) {
  const { user } = useAuthContext();
  const { addClient } = useDashboardContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cnpj: '',
    subscriptionFee: Plans.BASIC,
    status: Status.ACTIVE,
  });

  const createClient = useCallback(
    async (client: Omit<CreateClient, 'userId'>): Promise<Client> => {
      if (!user?.uid) {
        throw new Error('Usuário não autenticado.');
      }

      const clientWithUserId = { ...client, userId: user.uid };
      const createdClient = await ClientService.createClient(clientWithUserId);
      console.log(createdClient);
      return createdClient;
    },
    [user?.uid],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'subscriptionFee' ? Number(value) : value;

    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    try {
      clientSchema.parse({ ...formData });
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setFormErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    console.log(formData);
    setLoading(true);
    setError(null);
    const isValid = validateForm();

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const newClient = await createClient(formData);
      addClient(newClient);
      if (onClose) onClose();

      setFormData({
        name: '',
        email: '',
        cnpj: '',
        subscriptionFee: Plans.BASIC,
        status: Status.ACTIVE,
      });
    } catch (err) {
      const serviceError = err instanceof Error ? err.message : 'Erro ao criar cliente.';
      setError(serviceError);
    } finally {
      setLoading(false);
    }
  };

  const plansOptions = [
    { label: 'Plano Básico - R$99', value: Plans.BASIC },
    { label: 'Plano Intermediário - R$199', value: Plans.INTERMEDIATE },
    { label: 'Plano Avançado - R$299', value: Plans.ADVANCED },
  ];

  return {
    loading,
    error,
    formData,
    formErrors,
    handleChange,
    handleSubmit,
    plansOptions,
  };
}

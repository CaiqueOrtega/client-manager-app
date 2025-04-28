import { db } from '@/lib/firebase/config/browser';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { clientConverter } from './converter';
import { Client, CreateClient } from './types';
import { handleError } from '../../../utils/errorHandler';

const clientsRef = collection(db, 'clients').withConverter(clientConverter);

export const ClientService = {
  async checkExistingCnpj(userId: string, cnpj: string, excludeClientId?: string): Promise<void> {
    try {
      let q = query(clientsRef, where('userId', '==', userId), where('cnpj', '==', cnpj));

      if (excludeClientId) {
        q = query(q, where('id', '!=', excludeClientId));
      }

      const snap = await getDocs(q);
      if (!snap.empty) {
        throw new Error('Já existe um cliente com este CNPJ cadastrado para o seu usuário');
      }
    } catch (err) {
      handleError(err, 'Erro ao verificar CNPJ');
      throw err;
    }
  },

  async createClient(data: CreateClient): Promise<Client> {
    try {
      await this.checkExistingCnpj(data.userId, data.cnpj);

      const docRef = await addDoc(clientsRef, data);
      const snap = await getDoc(docRef.withConverter(clientConverter));
      if (!snap.exists()) throw new Error('Erro ao criar cliente');

      return snap.data();
    } catch (err) {
      handleError(err, 'Falha ao criar cliente');
      throw err;
    }
  },

  async getClients(userId: string): Promise<Client[]> {
    try {
      const q = query(clientsRef, where('userId', '==', userId));
      const snap = await getDocs(q);
      return snap.docs.map((d) => d.data());
    } catch (err) {
      handleError(err, 'Falha ao listar clientes');
      throw err;
    }
  },

  async updateClientStatus(clientId: string, status: string): Promise<Client> {
    try {
      const ref = doc(db, 'clients', clientId).withConverter(clientConverter);
      await updateDoc(ref, { status });

      const snap = await getDoc(ref);
      if (!snap.exists()) throw new Error('Cliente não encontrado');

      return snap.data();
    } catch (err) {
      handleError(err, 'Falha ao atualizar status do cliente');
      throw err;
    }
  },

  async deleteClient(clientId: string): Promise<Client> {
    try {
      const ref = doc(db, 'clients', clientId).withConverter(clientConverter);

      const snap = await getDoc(ref);
      if (!snap.exists()) throw new Error('Cliente não encontrado');

      const clientToDelete = snap.data();
      await deleteDoc(ref);

      return clientToDelete;
    } catch (err) {
      handleError(err, 'Falha ao excluir cliente');
      throw err;
    }
  },
};

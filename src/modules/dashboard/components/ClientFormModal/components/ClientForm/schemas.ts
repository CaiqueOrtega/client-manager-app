import { z } from 'zod';
import { Plans, Status } from '../../../../../../lib/firebase/service/client/browser/types';

const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

export const clientSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório.' }),
  email: z.string().email({ message: 'E-mail inválido.' }),
  cnpj: z
    .string()
    .regex(cnpjRegex, { message: 'CNPJ inválido. Use o formato 00.000.000/0000-00.' }),
  subscriptionFee: z.nativeEnum(Plans),
  status: z.nativeEnum(Status).default(Status.ACTIVE),
});

export const partialClientSchema = clientSchema.partial();

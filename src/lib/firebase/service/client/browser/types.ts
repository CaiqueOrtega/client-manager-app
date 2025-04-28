export enum Plans {
  BASIC = 99,
  INTERMEDIATE = 199,
  ADVANCED = 299,
}

export enum Status {
  ACTIVE = 'ativo',
  INACTIVE = 'inativo',
}

export interface Client {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  subscriptionFee: Plans;
  status: Status;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateClient = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;

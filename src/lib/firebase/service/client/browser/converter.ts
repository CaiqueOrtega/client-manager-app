import { FirestoreDataConverter, serverTimestamp, Timestamp } from 'firebase/firestore';
import { Client } from './types';

export const clientConverter: FirestoreDataConverter<Client> = {
  toFirestore(model: Client) {
    return {
      name: model.name,
      email: model.email,
      cnpj: model.cnpj,
      subscriptionFee: model.subscriptionFee,
      status: model.status,
      userId: model.userId,
      createdAt: model.createdAt ?? serverTimestamp(),
      updatedAt: model.updatedAt ?? serverTimestamp(),
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)!;

    return {
      id: snapshot.id,
      name: data.name,
      email: data.email,
      cnpj: data.cnpj,
      subscriptionFee: data.subscriptionFee,
      status: data.status,
      userId: data.userId,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt,
      updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : data.updatedAt,
    };
  },
};

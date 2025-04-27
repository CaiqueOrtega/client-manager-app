import { db } from '@/lib/firebase/config/browser';
import { handleError } from '../../../utils/errorHandler';
import { collection, addDoc, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { Client } from './types';

export const ClientService = {
  async createClient(client: Client, userId: string): Promise<Client> {
    try {
      const clientWithUserId = { ...client, userId };
      const clientsCollection = collection(db, 'clients');
      const docRef = await addDoc(clientsCollection, clientWithUserId);
      const createdClient = { ...clientWithUserId, id: docRef.id };
      return createdClient;
    } catch (error) {
      handleError(error, 'Não foi possível criar o cliente.');
      throw error;
    }
  },

  async getClients(userId: string): Promise<Client[]> {
    try {
      const clientsCollection = collection(db, 'clients');
      const q = query(clientsCollection, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const clients = snapshot.docs.map((doc) => doc.data() as Client);
      return clients;
    } catch (error) {
      handleError(error, 'Não foi possível obter os clientes.');
      throw error;
    }
  },

  async updateClient(clientId: string, clientUpdates: Partial<Client>): Promise<void> {
    try {
      const clientRef = doc(db, 'clients', clientId);
      await updateDoc(clientRef, clientUpdates);
    } catch (error) {
      handleError(error, 'Não foi possível atualizar o cliente.');
      throw error;
    }
  },
};

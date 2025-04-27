import { getFirebaseServerApp } from '@/lib/firebase/config/server';
import { auth } from '@/lib/firebase/config/server';
import { DecodedIdToken } from 'firebase-admin/auth';

export const AuthServerService = {
  async verifyIdToken(token: string): Promise<DecodedIdToken> {
    getFirebaseServerApp();
    if (process.env.NEXT_PUBLIC_FIREBASE_EMULATOR == 'true') {
      console.warn('⚠️ Emulador ativo: decodificando token manualmente...');
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));
      return payload as DecodedIdToken;
    }

    try {
      console.warn('⚠️ Emulador desativado: decodificando token');
      return await auth.verifyIdToken(token);
    } catch (error) {
      console.error('Erro na verificação do token:', error);
      throw new Error('Token inválido ou expirado');
    }
  },
};

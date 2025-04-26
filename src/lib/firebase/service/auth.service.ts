import { signInWithPopup } from 'firebase/auth';
import { UserService } from './user.service';
import { auth, googleProvider } from '../client';

export const AuthService = {
  async signInWithGoogle() {
    console.log('🔑 Iniciando o login com Google...');
    const result = await signInWithPopup(auth, googleProvider);
    console.log('🌀 Resultado do login com Google:', result);

    await new Promise((resolve) => {
      console.log('⏳ Esperando o estado de autenticação...');

      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          console.log('✅ Usuário autenticado:', user);
          unsubscribe(); // Para de ouvir a mudança de autenticação
          resolve(user); // Resolve com o usuário autenticado
        } else {
          console.log('⚠️ Nenhum usuário autenticado');
        }
      });
    });

    console.log('📝 Chamando UserService.createIfNotExists...');
    await UserService.createIfNotExists(result.user);
    console.log('✅ Usuário verificado/criado no Firestore:', result.user);

    return result.user;
  },
};

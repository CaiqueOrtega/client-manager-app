import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { firebaseBrowserConfig } from '..';

const app = initializeApp(firebaseBrowserConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// comentar as próximas 3 linhas para produção
//connectAuthEmulator(auth, 'http://localhost:9099');
//connectFirestoreEmulator(db, 'localhost', 8080);
//console.log('✅ Firebase configurado com emuladores locais');

export { auth, db, googleProvider };

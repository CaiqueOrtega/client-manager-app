import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import firebaseConfig from './config';

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// comente as próximas 3 linhas para produção
connectAuthEmulator(auth, 'http://localhost:9099');
connectFirestoreEmulator(db, 'localhost', 8080);
console.log('✅ Firebase configurado com emuladores locais');

export { auth, db };

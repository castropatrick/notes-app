import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAZCIOeBx19aI5T7LFRy15GrwNBRhcE6B8",
  authDomain: "notas-app-dbc90.firebaseapp.com",
  projectId: "notas-app-dbc90",
  storageBucket: "notas-app-dbc90.firebasestorage.app",
  messagingSenderId: "727393800829",
  appId: "1:727393800829:web:6d804601abb96bff725714",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';

type Nota = {
  id?: string;
  titulo: string;
  conteudo: string;
  userId: string;
  latitude?: number;
  longitude?: number;
  criadoEm?: unknown;
  atualizadoEm?: unknown;
}

export async function listarNotas(userId: string) {
  const q = query(
    collection(db, 'notas'),
    where('userId', '==', userId),
    orderBy('criadoEm', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Nota[];
}

export async function criarNota(userId: string, titulo: string, conteudo: string, latitude?: number, longitude?: number) {
  await addDoc(collection(db, 'notas'), {
    userId,
    titulo,
    conteudo,
    latitude: latitude || null,
    longitude: longitude || null,
    criadoEm: serverTimestamp(),
    atualizadoEm: serverTimestamp(),
  });
}

export async function atualizarNota(id: string, titulo: string, conteudo: string) {
  await updateDoc(doc(db, 'notas', id), {
    titulo,
    conteudo,
    atualizadoEm: serverTimestamp(),
  });
}

export async function deletarNota(id: string) {
  await deleteDoc(doc(db, 'notas', id));
}
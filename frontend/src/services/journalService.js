import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import { assertFirebaseConfigured, db } from './firebase.js';

function journalsCollection(userId) {
  return collection(db, 'users', userId, 'journals');
}

function mapJournal(document) {
  const data = document.data();
  return {
    id: document.id,
    title: data.title || 'Untitled',
    content: data.content || '',
    createdAt: data.createdAt || null
  };
}

export function subscribeToJournals(userId, onUpdate, onError) {
  assertFirebaseConfigured();
  const journalsQuery = query(journalsCollection(userId), orderBy('createdAt', 'desc'));
  return onSnapshot(
    journalsQuery,
    (snapshot) => {
      onUpdate(snapshot.docs.map(mapJournal));
    },
    onError
  );
}

export async function createJournalEntry(userId, { title, content }) {
  assertFirebaseConfigured();
  if (!userId) {
    throw new Error('User is required.');
  }

  const cleanTitle = title.trim();
  const cleanContent = content.trim();

  if (!cleanTitle && !cleanContent) {
    throw new Error('Add a title or content.');
  }

  await addDoc(journalsCollection(userId), {
    title: cleanTitle || 'Untitled',
    content: cleanContent,
    createdAt: serverTimestamp()
  });
}

export async function deleteJournalEntry(userId, entryId) {
  assertFirebaseConfigured();
  if (!userId || !entryId) {
    throw new Error('Entry not found.');
  }

  const entryRef = doc(db, 'users', userId, 'journals', entryId);
  await deleteDoc(entryRef);
}

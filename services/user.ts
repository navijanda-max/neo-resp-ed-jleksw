
import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';

export const getUserProfile = async (userId) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserProfile = async (userId, data) => {
  const docRef = doc(db, 'users', userId);
  await setDoc(docRef, data, { merge: true });
};

export const getAllUsers = async () => {
  const usersCollection = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCollection);
  const userList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return userList;
};

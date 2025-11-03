
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';

export const register = async (email, password) => {
  const usersCollection = collection(db, 'users');
  const userSnapshot = await getDocs(usersCollection);
  const isFirstUser = userSnapshot.empty;

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", userCredential.user.uid), {
    email: userCredential.user.email,
    courses: [],
    isAdmin: isFirstUser
  });
  return userCredential;
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

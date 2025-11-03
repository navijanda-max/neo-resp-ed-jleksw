
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from './firebase';

export const createUser = (uid, email, isAdmin = false) => {
  return setDoc(doc(db, "users", uid), {
    email,
    isAdmin,
    courses: []
  });
};

export const getUser = async (uid) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data() : null;
};

export const updateUserCourses = (uid, courses) => {
  return updateDoc(doc(db, "users", uid), { courses });
};

export const addCourseToUser = (uid, course) => {
  return updateDoc(doc(db, "users", uid), {
    courses: arrayUnion(course)
  });
};

export const removeCourseFromUser = (uid, course) => {
  return updateDoc(doc(db, "users", uid), {
    courses: arrayRemove(course)
  });
};

export const setUserAdmin = (uid, isAdmin) => {
  return updateDoc(doc(db, "users", uid), { isAdmin });
};

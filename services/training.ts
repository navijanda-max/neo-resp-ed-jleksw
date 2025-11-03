
import { collection, writeBatch, getDocs, doc } from 'firebase/firestore';
import { db } from './firebase';

// NOTE: This seed function is not idempotent. It will create new documents on each run.
// In a real-world application, you would want to check for existing data before seeding.
export const seedDatabase = async (trainingData) => {
  const batch = writeBatch(db);

  // Seed Modules
  const modulesCollection = collection(db, 'modules');
  // Check if modules are already seeded
  const modulesSnapshot = await getDocs(modulesCollection);
  if (modulesSnapshot.empty) {
    trainingData.modules.forEach(module => {
      const docRef = doc(modulesCollection);
      batch.set(docRef, module);
    });
  }

  // Seed Certifications
  const certificationsCollection = collection(db, 'certifications');
  const certsSnapshot = await getDocs(certificationsCollection);
  if (certsSnapshot.empty) {
    trainingData.certifications.forEach(cert => {
      const docRef = doc(certificationsCollection);
      batch.set(docRef, cert);
    });
  }

  await batch.commit();
};

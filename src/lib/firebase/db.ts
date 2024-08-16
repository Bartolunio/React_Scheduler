import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from './init';

export const db = getFirestore(firebaseApp);

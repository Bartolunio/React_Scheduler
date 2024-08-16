import { getAnalytics, isSupported } from 'firebase/analytics';
import { firebaseApp } from './init';

export const firebaseAnalytics = isSupported().then((yes) =>
  yes ? getAnalytics(firebaseApp) : null
);

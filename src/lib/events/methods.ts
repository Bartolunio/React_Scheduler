import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { Event, FirestoreEvent } from './types';

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const eventsQuery = query(
      collection(db, 'events'),
      where('isRemoved', '==', false)
    );

    const eventsSnapshot = await getDocs(eventsQuery);
    const events = eventsSnapshot.docs.map((doc) => {
      const data = doc.data() as FirestoreEvent;
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        notes: data.notes,
        startDate: data.startDate.toDate(),
        endDate: data.endDate.toDate(),
        isRemoved: data.isRemoved,
      } as Event;
    });
    return events;
  } catch {
    throw new Error('Error fetching events');
  }
};

export const addEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  const docRef = await addDoc(collection(db, 'events'), {
    ...event,
    startDate: Timestamp.fromDate(event.startDate),
    endDate: Timestamp.fromDate(event.endDate),
    isRemoved: false,
  });
  return { ...event, id: docRef.id };
};

export const updateEvent = async (id: string, changes: Partial<Event>) => {
  await updateDoc(doc(db, 'events', id), changes);
};

export const deleteEvent = async (id: string): Promise<void> => {
  await updateDoc(doc(db, 'events', id), {
    isRemoved: true,
  });
};

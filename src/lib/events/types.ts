import { Timestamp } from 'firebase/firestore';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  notes?: string;
  startDate: Date;
  endDate: Date;
  isRemoved: boolean;
}

export interface FirestoreEvent {
  title: string;
  description: string;
  notes?: string;
  startDate: Timestamp;
  endDate: Timestamp;
  isRemoved: boolean;
}

export interface CommitChangesParams {
  added?: CalendarEventWithoutId;
  changed?: Record<string, Partial<CalendarEvent>>;
  deleted?: string;
}

export type CalendarEventWithoutId = Omit<CalendarEvent, 'id'>;

import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import { CalendarEvent } from '../../lib/events';

const mapToAppointmentModel = (event: CalendarEvent): AppointmentModel => ({
  id: event.id,
  title: event.title,
  startDate: new Date(event.startDate),
  endDate: new Date(event.endDate),
  notes: event.notes,
});

const SchedulerAppointments = {
  mapToAppointmentModel,
};

export default SchedulerAppointments;

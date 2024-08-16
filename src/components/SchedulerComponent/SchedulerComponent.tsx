import { useState, useEffect, FC } from 'react';
import Paper from '@mui/material/Paper';
import {
  Scheduler,
  WeekView,
  MonthView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  ViewState,
  EditingState,
  IntegratedEditing,
  AppointmentModel,
} from '@devexpress/dx-react-scheduler';
import {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from '../../lib/events/methods';
import { CalendarEvent, CommitChangesParams } from '../../lib/events';
import plLocale from 'date-fns/locale/pl';
import ConfirmationDialog from './common/ConfirmationDialog';
import SchedulerAppointments from './SchedulerAppointments';

const SchedulerComponent: FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [data, setData] = useState<AppointmentModel[]>([]);
  const [editingAppointment, setEditingAppointment] =
    useState<CalendarEvent | null>(null);
  const [deletingAppointmentId, setDeletingAppointmentId] = useState<
    string | null
  >(null);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchEvents();
        setData(events.map(SchedulerAppointments.mapToAppointmentModel));
      } catch (error) {
        console.error('Failed to load events:', error);
      }
    };

    loadEvents();
  }, []);

  const commitChanges = async ({
    added,
    changed,
    deleted,
  }: CommitChangesParams) => {
    try {
      if (added) {
        const newEvent = await addEvent(added as Omit<CalendarEvent, 'id'>);
        setData((prevData) => [
          ...prevData,
          SchedulerAppointments.mapToAppointmentModel(newEvent),
        ]);
      }

      if (changed) {
        const changedEventId = Object.keys(changed)[0];
        const changedEvent = data.find(
          (appointment) => appointment.id === changedEventId
        );

        if (changedEvent) {
          const updatedEvent = {
            ...changedEvent,
            ...changed[changedEventId],
            startDate: changed[changedEventId].startDate
              ? new Date(changed[changedEventId].startDate)
              : changedEvent.startDate,
            endDate: changed[changedEventId].endDate
              ? new Date(changed[changedEventId].endDate)
              : changedEvent.endDate,
          };

          await updateEvent(changedEventId, updatedEvent);
          setData((prevData) =>
            prevData.map((appointment) =>
              appointment.id === changedEventId ? updatedEvent : appointment
            )
          );
        }
      }

      if (deleted) {
        setDeletingAppointmentId(deleted);
        setConfirmationVisible(true);
      }
    } catch (error) {
      console.error('Error updating events:', error);
    }
  };

  const handleDeleteConfirmation = async () => {
    if (deletingAppointmentId) {
      try {
        await deleteEvent(deletingAppointmentId);
        setData((prevData) =>
          prevData.filter(
            (appointment) => appointment.id !== deletingAppointmentId
          )
        );
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
      setDeletingAppointmentId(null);
      setConfirmationVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setDeletingAppointmentId(null);
    setConfirmationVisible(false);
  };

  return (
    <Paper>
      <Scheduler data={data} locale={plLocale}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState
          onCommitChanges={commitChanges}
          editingAppointment={editingAppointment}
          onEditingAppointmentChange={setEditingAppointment}
        />
        <IntegratedEditing />
        <WeekView startDayHour={0} endDayHour={24} />
        <DayView startDayHour={0} endDayHour={24} />
        <MonthView />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />
        <Toolbar />
        <DateNavigator />
        <ViewSwitcher />
        <DragDropProvider />
      </Scheduler>

      <ConfirmationDialog
        confirmationVisible={confirmationVisible}
        handleCancelDelete={handleCancelDelete}
        handleDeleteConfirmation={handleDeleteConfirmation}
      />
    </Paper>
  );
};

export default SchedulerComponent;

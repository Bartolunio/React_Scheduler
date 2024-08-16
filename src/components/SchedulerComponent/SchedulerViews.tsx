import { FC } from 'react';
import {
  WeekView,
  MonthView,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';

const SchedulerViews: FC = () => (
  <>
    <WeekView startDayHour={0} endDayHour={24} />
    <DayView startDayHour={0} endDayHour={24} />
    <MonthView />
  </>
);

export default SchedulerViews;

import { FC } from 'react';
import {
  Toolbar,
  DateNavigator,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';

const SchedulerToolbar: FC = () => (
  <>
    <Toolbar />
    <DateNavigator />
    <ViewSwitcher />
  </>
);

export default SchedulerToolbar;

import { FC } from 'react';
import ConfirmationDialog from './common/ConfirmationDialog';

interface SchedulerDialogProps {
  confirmationVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const SchedulerDialog: FC<SchedulerDialogProps> = ({
  confirmationVisible,
  onConfirm,
  onCancel,
}) => (
  <ConfirmationDialog
    open={confirmationVisible}
    onConfirm={onConfirm}
    onCancel={onCancel}
    title='Confirm Delete'
    description='Are you sure you want to delete this event? This action cannot be undone.'
  />
);

export default SchedulerDialog;

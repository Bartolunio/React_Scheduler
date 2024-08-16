import { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface ConfirmationDialogProps {
  confirmationVisible: boolean;
  handleCancelDelete: () => void;
  handleDeleteConfirmation: () => void;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  confirmationVisible,
  handleCancelDelete,
  handleDeleteConfirmation,
}) => (
  <Dialog open={confirmationVisible} onClose={handleCancelDelete}>
    <DialogTitle>Potwierdzenie usunięcia</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Czy na pewno chcesz usunąć to zdarzenie? Tego działania nie można
        cofnąć.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCancelDelete} color='primary'>
        Anuluj
      </Button>
      <Button onClick={handleDeleteConfirmation} color='secondary'>
        Usuń
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const SimpleDialog = ({ open, title, description, onClose, buttons }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      {buttons ? (
        <DialogActions>
          {buttons.map((b) => {
            return (
              <Button onClick={b.onClick} autoFocus={b.autoFocus}>
                {b.title}
              </Button>
            );
          })}
        </DialogActions>
      ) : (
        <></>
      )}
    </Dialog>
  );
};

export default SimpleDialog;

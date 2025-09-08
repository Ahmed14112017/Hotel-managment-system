import * as React from "react";
import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

export interface IDialog {
  handleClose: () => void;
  open: boolean;
  children: React.ReactNode;
  fullScreen: any;
}

export default function DialogComponent({
  handleClose,
  open,
  children,
  fullScreen,
}: IDialog) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={fullScreen}
      >
        {children}
      </Dialog>
    </React.Fragment>
  );
}

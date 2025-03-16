import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogModel({ open, fullScreen = false, children }) {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullScreen={fullScreen}
            disableScrollLock
            aria-describedby="alert-dialog-slide-description"
        >
            {children}
        </Dialog>
    );
}

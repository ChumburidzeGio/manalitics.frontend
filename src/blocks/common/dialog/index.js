import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core/Dialog';
import styles from './styles.css';

const XDialog = ({ title, desctiption, onClose, onSubmit, buttonText, open, children }) => (
    <Dialog
        open={open}
        onClose={onClose}
        className={styles.root}
    >
        <DialogTitle>{title}</DialogTitle>

        <DialogContent className={styles.content}>

            <DialogContentText>
                {desctiption}
            </DialogContentText>

            {children}

        </DialogContent>

        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} color="primary" autoFocus>{buttonText}</Button>
        </DialogActions>
    </Dialog>
);

export default XDialog;

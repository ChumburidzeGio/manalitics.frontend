import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
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
            <Button onClick={onSubmit} color="primary">{buttonText}</Button>
        </DialogActions>
    </Dialog>
);

export default XDialog;

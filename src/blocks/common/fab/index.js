import React from 'react';
import { Zoom } from 'material-ui/transitions';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Button from 'material-ui/Button';
import styles from './styles.css';
import classNames from 'classnames';

export const Fab = ({ icon, onClick, type }) => (
    <Zoom
        in={true}
        timeout={300}
        unmountOnExit
    >
        <Button variant="fab" className={classNames(styles.button, styles[type])} color="primary" onClick={onClick}>
            {type === 'editInline' ? <EditIcon /> : <AddIcon />}
        </Button>
    </Zoom>
);

export default Fab;
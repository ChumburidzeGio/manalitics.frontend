import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import styles from './Dashboard.css';

export const Transaction = ({ title, id, amount, description, ...other }) => (
    <ListItem button key={id} {...other}>
        <ListItemText
            primary={title}
            secondary={description}
            className={styles.listItem} />
        <ListItemText
            primary={amount}
            className={styles.listItem}
            style={{ textAlign: 'right' }} />
    </ListItem>
);

export default Transaction;
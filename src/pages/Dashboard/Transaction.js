import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import styles from './Dashboard.css';
import classnames from 'classnames';

export const Transaction = ({ title, id, amount, description, className, ...other }) => (
    <ListItem button key={id} {...other} className={classnames(className, styles.listItem)}>
        <ListItemText
            primary={title}
            secondary={description} />
        <ListItemText
            primary={amount}
            className={styles.listItemRight}
            style={{ textAlign: 'right' }} />
    </ListItem>
);

export default Transaction;
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import CategoryIcon from '@material-ui/icons/Category';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import NotesIcon from '@material-ui/icons/Notes';
import { deactivateTransaction, updateEditor } from '../state';
import { connect } from 'react-redux';
import moment from 'moment';
import { find } from '../api';
import styles from './styles.css';
import { Fab } from '../../common';

const info = [
    {key: 'category', icon: <CategoryIcon />, label: 'Category', defaultValue: 'Gifts & Donations' },
    {key: 'date', icon: <AccessTimeIcon />, label: 'Date', defaultValue: '25th Jul, 2018 12:56', format: (value) => {
        return moment(value).format('Do MMM, YYYY HH:mm');
    }},
    {key: 'description', icon: <NotesIcon />, label: 'Description' },
];

class Show extends React.Component {

    state = {
        data: null,
        isOpen: false
    };

    componentDidMount = () => {
        find(this.props.id).then(({ data }) => {
            this.setState({ data, isOpen: true });
        });
    }

    onClose = () => {
        this.setState({ isOpen: false });
        setTimeout(this.props.deactivateTransaction, 100);
    }

    onEdit = () => {
        this.props.updateEditor({
            status: 'update',
            transactionId: this.props.id
        });
    }

    render() {

        const item = this.state.data;

        return (
            <Drawer open={this.state.isOpen} onClose={this.onClose}>
                <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={this.onClose}
                    className={styles.list}
                >
                    {item && <List>
                        <ListItem className={styles.header}>
                            <Avatar>{item.title[0]}</Avatar>
                            <ListItemText className={styles.title} primary={item.title} secondary={item.amount_formated} />
                            <Fab type="editInline" onClick={this.onEdit} />
                        </ListItem>
                        
                        {info.map(pr => {
                            let value = item[pr.key] || pr.defaultValue;

                            if(pr.format) {
                                value = pr.format(value);
                            }

                            return value ? (
                                <ListItem key={pr.key}>
                                    <ListItemIcon>
                                        {pr.icon}
                                    </ListItemIcon>
                                    <ListItemText className={styles.infoBlock} primary={value} secondary={pr.label} />
                                </ListItem>
                            ) : '';
                        })}

                    </List>}
                </div>
            </Drawer>
        );
    }
}

const mapStateToProps = (state) => ({
    id: state.transactionReducer.active
});

export default connect(mapStateToProps, { deactivateTransaction, updateEditor })(Show);

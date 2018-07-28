import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import { deactivateTransaction } from '../state';
import { connect } from 'react-redux';
import { find } from '../api';
import styles from './styles.css';

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

    render() { 

        const item = this.state.data;

        return (
            <Drawer open={this.state.isOpen} onClose={this.onClose}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.onClose}
                    onKeyDown={this.onClose}
                    className={styles.list}
                >
                    {item && <List>
                        <ListItem>
                            <Avatar>H</Avatar>
                            <ListItemText primary={item.title} />
                        </ListItem>

                        <div className={styles.details}>

                            <Typography gutterBottom>
                                <strong>Transaction:</strong> {item.is_expense && '-'}{item.amount} {item.currency}
                            </Typography>

                            <Typography gutterBottom>
                                <strong>Date:</strong> {item.date}
                            </Typography>

                            <Typography gutterBottom>
                                <strong>Type:</strong> {item.type}
                            </Typography>

                            <Typography gutterBottom>
                                <strong>Description:</strong> {item.description}
                            </Typography>

                        </div>
                    </List>}
                </div>
            </Drawer>
        );
    }
}

const mapStateToProps = (state) => ({
  id: state.transactionReducer.active
});

export default connect(mapStateToProps, { deactivateTransaction })(Show);

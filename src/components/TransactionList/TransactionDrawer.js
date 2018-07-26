import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import { find } from '../../api/transactionApi';
import styles from './TransactionList.css';
import { deactivateTransaction } from '../../state/transactions';
import { connect } from 'react-redux';

class TransactionDrawer extends React.Component {

    state = {
        data: null
    };

    componentDidMount = () => {
        find(this.props.id).then(({ data }) => {
            this.setState({ data });
        });
    }

    render() { 

        if(this.props.id === null) {
            return '';
        }

        const { title, is_expense, amount, currency, date, type, description } = this.state.data;
        const { deactivateTransaction } = this.props;

        return (
            <Drawer open={this.state.isOpen} onClose={deactivateTransaction()}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={deactivateTransaction()}
                    onKeyDown={deactivateTransaction()}
                    className={styles.drawerList}
                >
                    {this.state.data && <List>
                        <ListItem>
                            <Avatar className={styles.avatar}>H</Avatar>
                            <ListItemText primary={title} />
                        </ListItem>

                        <div className={styles.drawerDetails}>

                            <Typography gutterBottom>
                                <strong>Transaction:</strong> {is_expense && '-'}{amount} {currency}
                            </Typography>

                            <Typography gutterBottom>
                                <strong>Date:</strong> {date}
                            </Typography>

                            <Typography gutterBottom>
                                <strong>Type:</strong> {type}
                            </Typography>

                            <Typography gutterBottom>
                                <strong>Description:</strong> {description}
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

export default connect(mapStateToProps, { deactivateTransaction })(TransactionDrawer);

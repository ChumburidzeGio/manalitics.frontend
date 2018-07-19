import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import { find } from '../../state/transactions';
import styles from './Dashboard.css';

class TransactionDrawer extends React.Component {

    state = {
        isOpen: true,
        isLoading: true,
        data: {}
    };

    componentDidMount = () => {
        find(this.props.id).then(({ data }) => {
            this.setState({ data: data.transaction });
        });
    }

    toggleDrawer = (open) => () => {
        this.setState({
            isOpen: open,
        });
    };

    render() {
        const { title, is_expense, amount, currency } = this.state.data;

        return (
            <Drawer open={this.state.isOpen} onClose={this.toggleDrawer(false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer(false)}
                    onKeyDown={this.toggleDrawer(false)}
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

export default TransactionDrawer;

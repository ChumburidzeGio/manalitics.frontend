import React from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { showSnack, hideSnack } from '../../state/snackbarActions';
import List from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import moment from 'moment';
import { loadTransactions } from '../../state/transactions';
import withRoot from '../../withRoot';
import client from '../../client';
import styles from './Dashboard.css';
import Transaction from './Transaction';

class TransactionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      searchResults: [],
    };
  };

  componentDidMount = () => {
    this.props.loadTransactions();
  }

  handleTransactionClick = () => {
    console.log(12);
  };

  loadMore = () => {
    this.props.loadTransactions(2);
  };

  handleChangeX = (name, value) => {
    this.setState({ [name]: value });
  }

  transformDay(day) {
    return moment(day).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'DD MMM YYYY',
      sameElse: 'DD MMM YYYY'
    });
  }

  search = (event) => {

    let query = event.target.value;

    let params = {};

    params.query = query.toLowerCase().split(" ").filter(piece => {

      if (piece.startsWith('from:')) {
        params.from = piece.replace('from:', '');
        return false;
      }

      if (piece.startsWith('to:')) {
        params.to = piece.replace('to:', '');
        return false;
      }

      return true;

    }).join(' ');

    client().post('/search', params).then(({ data }) => {
      this.setState({ searchResults: data.transactions || [] });
    }).catch(error => {
      throw (error)
    })

    this.setState({ searchQuery: query });
  }

  render() {

    const { transactions } = this.props

    return (
      <Paper className={styles.container} elevation={1}>

        {this.state.searchQuery ?
          <List
            component="nav"
            subheader={
              <ListSubheader component="div" disableSticky={true}>Search results</ListSubheader>
            }>

            {this.state.searchResults.map(item => {
              return (
                <Transaction
                  id={item.id}
                  title={item.title}
                  description={item.date + ' · ' + item.description}
                  amount={item.amount}
                />
              )
            })}

          </List>
          :
          <List
            component="nav"
            subheader={
              <ListSubheader component="div" disableSticky={true}>My transactions</ListSubheader>
            }>

            {transactions.items && transactions.items.map(group => {
              return (
                <div key={group.day}>
                  <ListSubheader disableSticky={true} style={{ color: '#3b5998' }}>
                    {this.transformDay(group.day)}
                  </ListSubheader>
                  {group.items.map(item => {
                    return (
                      <Transaction
                        id={item.id}
                        title={item.title}
                        description={item.date + ' · ' + item.description}
                        amount={item.amount}
                        onClick={this.handleTransactionClick()}
                      />
                    )
                  })}
                </div>
              );
            })}

            {transactions.nextPageId && <Button component="span" fullWidth color="primary" onClick={this.loadMore}>
              Load more
            </Button>}


          </List>}

      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactionReducer
});

export default withRoot(
  connect(mapStateToProps, { showSnack, hideSnack, loadTransactions })(TransactionList)
);

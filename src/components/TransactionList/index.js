import React from 'react';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { connect } from 'react-redux';
import { showSnack, hideSnack } from '../../state/snackbarActions';
import { loadTransactions } from '../../state/transactions';
import styles from './TransactionList.css';
import Table, { TableBody } from 'material-ui/Table';
import Head from "./Head";
import classNames from 'classnames';
import TransactionDrawer from './TransactionDrawer';
import Transaction from './Transaction';

class TransactionList extends React.Component {
  componentDidMount = () => {
    this.props.loadTransactions();
  }

  loadMore = () => {
    this.props.loadTransactions();
  };

  render() {

    const { items, nextPageId, selected } = this.props.transactions;

    return (
      <Paper className={styles.tableRoot + ' ' + styles.container} elevation={1}>

        <Toolbar
          className={classNames(styles.toolbarRoot, {
            [styles.toolbarHighlight]: this.props.hasSelected,
          })}
        >
          <div className={styles.toolbarTitle}>
            {this.props.hasSelected ? (
              <Typography color="inherit" variant="subheading">
                {selected.length} selected
                  </Typography>
            ) : (
                <Typography variant="display1" className={styles.toolbarTitleText}>
                  Transactions
                  </Typography>
              )}
          </div>
          <div className={styles.toolbarSpacer} />
          <div className={styles.toolbarActions}>
            {this.props.hasSelected ? (
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            ) : ''}
          </div>
        </Toolbar>

        <div className={styles.tableWrapper}>
          <Table className={styles.table} aria-labelledby="tableTitle">
            <Head />
            <TableBody>
              {items
                .map(item => {
                  return (
                    <Transaction 
                        key={item.id}
                        item={item}
                        styles={styles}
                    />
                  );
                })}
            </TableBody>
          </Table>
          {nextPageId && <Button component="span" fullWidth color="primary" onClick={this.loadMore}>
            Load more
        </Button>}
        </div>
        <TransactionDrawer />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
    console.log(state.transactionReducer);
    return {
      transactions: state.transactionReducer,
        hasSelected: state.transactionReducer.selected.length > 0,
    };
};

export default connect(mapStateToProps, { showSnack, hideSnack, loadTransactions })(TransactionList);

import React from 'react';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { connect } from 'react-redux';
import { showSnack, hideSnack } from '../../state/snackbarActions';
import moment from 'moment';
import { loadTransactions } from '../../state/transactions';
import withRoot from '../../withRoot';
import client from '../../client';
import styles from './Dashboard.css';
import PropTypes from 'prop-types';
// import Transaction from './Transaction';
import Table, {
  TableBody,
  TableCell,
  TableRow,
} from 'material-ui/Table';
import Head from "../../components/TransactionList/Head";
import classNames from 'classnames';

class TransactionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      searchQuery: '',
      searchResults: [],
      data: props.transactions.items,
    };
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: this.props.transactions.items.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (e, id) => {
    const { selected } = this.state;

    if (selected.length > 0) {
      return this.selectById(id);
    }

    alert(12);
  };

  handleSelect = (e, id) => {
    this.selectById(id);
    e.preventDefault();
    e.stopPropagation();
  };

  selectById = (id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;


  componentDidMount = () => {
    this.props.loadTransactions();
  }

  loadMore = () => {
    this.props.loadTransactions();
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

    const { selected } = this.state;
    const { items, nextPageId } = this.props.transactions;

    return (
      <Paper className={styles.tableRoot + ' ' + styles.container} elevation={1}>

        <Toolbar
          className={classNames(styles.toolbarRoot, {
            [styles.toolbarHighlight]: selected.length > 0,
          })}
        >
          <div className={styles.toolbarTitle}>
            {selected.length > 0 ? (
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
            {(selected.length > 0) ? (
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            ) : (
                ''
                // <IconButton aria-label="Filter list">
                //   <AddIcon />
                // </IconButton>
              )}
          </div>
        </Toolbar>

        <div className={styles.tableWrapper}>
          <Table className={styles.table} aria-labelledby="tableTitle">
            <Head
              numSelected={selected.length}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={items.length}
            />
            <TableBody>
              {items
                .map(item => {
                  const isSelected = this.isSelected(item.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, item.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={0}
                      key={item.id}
                      selected={isSelected}
                    >
                      <TableCell tabIndex={-1} padding="checkbox" onClick={event => this.handleSelect(event, item.id)}>
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell padding="none">{item.date}</TableCell>
                      <TableCell>
                        <span className={styles.tableTransactionTitle}>{item.title}</span>
                        <span className={styles.tableTransactionAccount}>{item.account}</span>
                      </TableCell>
                      <TableCell component="th" scope="row" className={styles.amount}>
                        {item.amount_formated}
                        <span className={styles.currency}>{item.currency}</span>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {nextPageId && <Button component="span" fullWidth color="primary" onClick={this.loadMore}>
            Load more
        </Button>}
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactionReducer
});

export default connect(mapStateToProps, { showSnack, hideSnack, loadTransactions })(TransactionList);

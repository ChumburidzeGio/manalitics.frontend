import React from 'react';
import styles from './TransactionList.css';
import { TableCell, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import { selectTransactionById, activateTransaction } from '../../state/transactions';
import { connect } from 'react-redux';

export class Transaction extends React.Component {
  handleClick = () => {
    const { item, selected } = this.props;

    if (selected.length > 0) {
      return this.props.selectTransactionById(item.id);
    }

    this.props.activateTransaction(item.id);
  };

  handleSelect = () => {
    this.props.selectTransactionById(this.props.item.id);
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const { item, onClick, selected, onSelect } = this.props;
    const isSelected = selected.indexOf(item.id) !== -1;

    return (
      <TableRow
        hover
        onClick={() => onClick()}
        role="checkbox"
        aria-checked={isSelected}
        tabIndex={0}
        key={item.id}
        selected={isSelected}
      >
        <TableCell tabIndex={-1} padding="checkbox" onClick={() => onSelect()}>
          <Checkbox checked={isSelected} />
        </TableCell>
        <TableCell padding="none">{item.date}</TableCell>
        <TableCell>
          <span className={styles.tableTransactionTitle}>{item.title}</span>
          <span className={styles.tableTransactionAccount}>{item.account}</span>
        </TableCell>
        <TableCell>{item.category}</TableCell>
        <TableCell component="th" scope="row" className={styles.amount}>
          {item.amount_formated}
          <span className={styles.currency}>{item.currency}</span>
        </TableCell>
      </TableRow>
    );
  };
};

const mapStateToProps = (state) => ({
  selected: state.transactionReducer.selected
});

export default connect(mapStateToProps, { selectTransactionById, activateTransaction })(Transaction);
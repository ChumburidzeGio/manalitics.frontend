import React, { Fragment } from 'react';
import { Table, Fab } from '../../common';
import {
    loadTransactions,
    selectTransactionById,
    selectTransactionsAll,
    activateTransaction,
    deleteSelected,
    updateEditor
} from '../state';
import { connect } from 'react-redux';
import styles from './styles.css';
import TransactionShow from '../show';
import TransactionsEditor from '../editor';
import moment from 'moment';

const humanizeDate = (date) => {
    return moment(date).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: 'Do MMM',
        sameElse: 'Do MMM, YYYY'
    });
}

const columns = [
    {
        id: 'date', label: 'Date', padding: "none", render: (item) => (
            <Fragment>
                {humanizeDate(item.date)}
            </Fragment>
        )
    },
    {
        id: 'title', label: 'Title', render: (item) => (
            <Fragment>
                <span className={styles.title}>{item.title}</span>
                {/* <span className={styles.account}>{item.account}</span> */}
            </Fragment>
        )
    },
    { id: 'category', label: 'Category' },
    {
        id: 'amount', label: 'Amount', padding: "none", render: (item) => (
            <Fragment>
                <span className={styles.amount}>{item.amount}</span>
                <span className={styles.currency}>{item.currency}</span>
            </Fragment>
        )
    },
];

class List extends React.Component {
    componentDidMount = () => {
        this.props.loadTransactions();
    }

    onCreateNew = () => {
        this.props.updateEditor({
            status: 'create'
        });
    }

    render() {
        const { transactions } = this.props;

        return (
            <Fragment>
                <Table
                    title="Transactions"
                    selected={transactions.selected}
                    hasMore={transactions.nextPageId !== null}
                    items={transactions.items}
                    columns={columns}
                    onLoadMore={this.props.loadTransactions}
                    onSelectAll={this.props.selectTransactionsAll}
                    onDeleteSelected={this.props.deleteSelected}
                    onItemSelect={this.props.selectTransactionById}
                    onItemClick={this.props.activateTransaction}
                />
                {transactions.active !== null && <TransactionShow />}
                {transactions.editor.status !== 'closed' && <TransactionsEditor />}
                <Fab onClick={this.onCreateNew} />
            </Fragment>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        transactions: state.transactionReducer,
    };
};

export default connect(mapStateToProps, {
    loadTransactions, selectTransactionById, selectTransactionsAll, activateTransaction, deleteSelected, updateEditor
})(List);

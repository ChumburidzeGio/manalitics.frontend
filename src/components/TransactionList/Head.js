import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';
import { TableRow, TableHead, TableCell } from 'material-ui/Table';
import { selectTransactionsAll } from '../../state/transactions';
import { connect } from 'react-redux';

const columnData = [
    { id: 'date', label: 'Date' },
    { id: 'title', label: 'Title' },
    { id: 'amount', label: 'Amount' },
    { id: 'category', label: 'Category' },
];

const Head = ({ indeterminate, checked, selectTransactionsAll }) => (
    <TableHead>
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                    indeterminate={indeterminate}
                    checked={checked}
                    onChange={(e, checked) => selectTransactionsAll(checked)}
                />
            </TableCell>
            {columnData.map(column => {
                return (
                    <TableCell
                        key={column.id}
                        padding={'default'}
                    >
                        {column.label}
                    </TableCell>
                );
            }, this)}
        </TableRow>
    </TableHead>
);

Head.propTypes = {};

const mapStateToProps = (state) => ({
    indeterminate: selected.length > 0 && selected.length < items.length,
    checked: selected.length === items.length,
});

export default connect(mapStateToProps, { selectTransactionsAll })(Head);
import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';
import { TableRow, TableHead, TableCell } from 'material-ui/Table';

const columnData = [
    { id: 'date', label: 'Date' },
    { id: 'title', label: 'Title' },
    { id: 'amount', label: 'Amount' },
    { id: 'category', label: 'Category' },
];

const Head = ({ onSelectAllClick, numSelected, rowCount }) => (
    <TableHead>
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={numSelected === rowCount}
                    onChange={onSelectAllClick}
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

Head.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default Head;
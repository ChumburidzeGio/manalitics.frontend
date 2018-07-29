import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { default as MuiToolbar } from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { default as MuiTable, TableHead, TableBody, TableCell, TableRow } from 'material-ui/Table';
import classNames from 'classnames';
import Checkbox from 'material-ui/Checkbox';
import styles from './styles.css';

export const Toolbar = ({ selected, title, onDeleteSelected }) => {
  const hasSelected = selected.length > 0;
  const classes = classNames(styles.toolbarRoot, {
    [styles.toolbarHighlight]: hasSelected,
  });

  const titleBlock = hasSelected ? (
    <Typography color="inherit" variant="subheading">
      {selected.length} selected
        </Typography>
  ) : (
      <Typography variant="display1" className={styles.toolbarTitleText}>
        {title}
      </Typography>
    );

  return (
    <MuiToolbar className={classes}>
      <div className={styles.toolbarTitle}>
        {titleBlock}
      </div>
      <div className={styles.toolbarSpacer} />
      <div className={styles.toolbarActions}>
        {hasSelected ? (
          <IconButton aria-label="Delete" onClick={onDeleteSelected}>
            <DeleteIcon />
          </IconButton>
        ) : ''}
      </div>
    </MuiToolbar>
  );
};

export const Head = ({ columns, selected, items, onSelectAll }) => {
  const indeterminate = selected.length > 0 && selected.length < items.length;
  const checked = selected.length === items.length;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={indeterminate}
            checked={checked}
            onChange={(e, checked) => onSelectAll(checked)}
          />
        </TableCell>
        {columns.map(column => {
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
};

export const Item = ({ item, selected, onClick, onSelect, columns }) => {
  const isSelected = selected.indexOf(item.id) !== -1;

  const clickHandler = (e, id) => {
    onSelect(id);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <TableRow
      hover
      onClick={(e) => onClick(item.id)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      key={item.id}
      selected={isSelected}
    >
      <TableCell tabIndex={-1} padding="checkbox" onClick={(e) => clickHandler(e, item.id)}>
        <Checkbox checked={isSelected} />
      </TableCell>
      {columns.map(column => {
        return (
          <TableCell
            key={item.id + column.id}
            padding={column.padding || 'default'}
          >
            {column.render ? column.render(item) : item[column.id]}
          </TableCell>
        );
      }, this)}
    </TableRow>
  );
};

export const Table = ({
  title,
  selected,
  hasMore,
  items,
  columns,
  onLoadMore,
  onSelectAll,
  onItemSelect,
  onItemClick,
  onDeleteSelected,
}) => {

  return (
    <Fragment>
      <Toolbar {...{ title, selected, onDeleteSelected }} />
      <div className={styles.tableWrapper}>
        <MuiTable className={styles.table} aria-labelledby="tableTitle">
          <Head
            items={items}
            selected={selected}
            onSelectAll={onSelectAll}
            columns={columns}
          />
          <TableBody>
            {items
              .map(item => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    columns={columns}
                    selected={selected}
                    onClick={onItemClick}
                    onSelect={onItemSelect}
                  />
                );
              })}
          </TableBody>
        </MuiTable>
        {hasMore && <Button component="span" fullWidth color="primary" onClick={onLoadMore}>
          Load more
                </Button>}
      </div>
    </Fragment>
  );
};

Table.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  hasMore: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onDeleteSelected: PropTypes.func.isRequired,
};

export default Table;
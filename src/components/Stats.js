import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

class Stats extends React.Component {

    constructor(props) {

        super(props);

        let data = [];

        if(props.data.length)
        {
            data = props.data.map((item, month) => createData(item.month, item.expense, item.income, item.change));
        }

        this.state = {
            data: data
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell numeric>Expense</TableCell>
                    <TableCell numeric>Income</TableCell>
                    <TableCell numeric>Change</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.data.map(n => {
                    return (
                    <TableRow key={n.id}>
                        <TableCell>{n.name}</TableCell>
                        <TableCell numeric>{n.calories}</TableCell>
                        <TableCell numeric>{n.fat}</TableCell>
                        <TableCell numeric>{n.carbs}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
            </div>
        );
    }
}

Stats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Stats);

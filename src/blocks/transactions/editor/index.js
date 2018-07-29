import React from 'react';
import classnames from 'classnames';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import Grid from 'material-ui/Grid';
import { MenuItem } from 'material-ui/Menu';
import MaskedInput from 'react-text-mask';
import { connect } from 'react-redux';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import moment from 'moment';
import * as api from '../api';
import { showSnack } from '../../app/state';
import { loadTransactions, updateEditor, deactivateTransaction, activateTransaction, deleteActive } from '../state';
import { Select } from '../../common';
import styles from './styles.css';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
];

const categories = [
  {
    label: 'Transacport',
    value: 'tr',
  },
  {
    label: 'Clothing',
    value: 'cl',
  },
  {
    label: 'Hairdresser',
    value: 'hr',
  },
  {
    label: 'Uncategorized',
    value: 'un',
  }
];

class MoneyInput extends React.Component {
  render() {
    const mask = createNumberMask({
      prefix: '',
      suffix: '',
      allowDecimal: true,
      allowNegative: true
    });

    return (
      <MaskedInput
        {...this.props}
        mask={mask}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
}

class Editor extends React.Component {

  state = {
    currency: 'EUR',
    date: moment().format("YYYY-MM-DDT00:00"),
    amount: '-0.00',
    isExpense: true,
    title: '',
    description: '',
    category: null,
  };

  componentDidMount = () => {
    const { status, transactionId } = this.props.editor;

    setTimeout(this.setState({ isOpen: true, status, transactionId }), 200);

    if(status === 'update') {
      api.find(this.props.editor.transactionId).then(({ data }) => {
        this.setState({
          id: data.id,
          amount: data.amount,
          title: data.title,
          category: data.category_id,
          description: data.description,
          isExpense: data.isExpense,
          currency: data.currency,
          date: moment(data.date).format("YYYY-MM-DDT00:00"),
        });
      });
    }
  }

  onClose = () => {
    this.setState({ isOpen: false }, () => {
      setTimeout(() => {
        this.props.updateEditor({
          status: 'closed',
        });
      }, 200);
    });
  }

  handleAmountChange = (event) => {
    const amount = event.target.value;

    this.setState({
      amount,
      isExpense: amount.startsWith('-')
    });
  }

  handleTypeChange = (isExpense) => (event) => {
    let amount = this.state.amount.replace(/-/g, '');

    if (isExpense) {
      amount = '-' + amount;
    }

    this.setState({ isExpense, amount });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleChangeSelect = (name, value) => this.setState({ [name]: value })

  getCurreny = () => {
    const currency = currencies.find(item => item.value === this.state.currency);
    return currency.label;
  }

  handleSubmit = (e) => {
    const { currency, date, amount, isExpense, title, description, category, id } = this.state;
    const apiCall = this.isUpdate() ? api.update : api.create;

    e.preventDefault();

    apiCall({ currency, date, amount, isExpense, title, description, category, id }).then(() => {
      this.props.showSnack('Transaction successfully ' + (this.isUpdate() ? 'updated' : 'created'));
      this.props.loadTransactions();
      this.props.deactivateTransaction();
      this.props.activateTransaction(id);
      this.onClose();
    });
  }

  handleDelete = (e) => {
    this.props.deleteActive().then(() => {
      this.props.showSnack('Transaction successfully deleted');
      this.onClose();
    });
  }

  isUpdate = () => this.state.status === 'update';

  render() {

    return (
      <Drawer anchor={this.isUpdate() ? 'left' : 'right'} open={this.state.isOpen} onClose={this.onClose}>

        <Typography type="title" color="inherit" className={styles.title}>
          {this.isUpdate() ? 'Update' : 'Add new'} transaction
          </Typography>

        {this.state.isOpen && <form autoComplete="off" className={styles.form} onSubmit={this.handleSubmit}>

          <Grid container spacing={0} className={styles.typeGroup}>
            <Grid item lg={6}>
              <button
                type="button"
                className={classnames(styles.typeButton, {
                  [styles.typeActive]: this.state.isExpense
                })}
                onClick={this.handleTypeChange(true)}
              >Expense</button>
            </Grid>
            <Grid item lg={6}>
              <button
                type="button"
                className={classnames(styles.typeButton, {
                  [styles.typeActive]: !this.state.isExpense
                })}
                onClick={this.handleTypeChange(false)}
              >Income</button>
            </Grid>
          </Grid>

          <Grid container spacing={24}>
            <Grid item lg={9}>
              <TextField
                label="Amount"
                name="amount"
                helperText="Add minus to mark as expense"
                className={styles.textField}
                value={this.state.amount}
                autoFocus
                onChange={this.handleAmountChange}
                type="text"
                InputProps={{
                  startAdornment: <InputAdornment position="start">{this.getCurreny()}</InputAdornment>,
                  inputComponent: MoneyInput
                }}
              />
            </Grid>

            <Grid item lg={3}>
              <TextField
                select
                className={styles.textField}
                value={this.state.currency}
                onChange={this.handleChange('currency')}
                SelectProps={{
                  MenuProps: {
                    className: styles.menu,
                  },
                }}
                margin="normal"
              >
                {currencies.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <TextField
            label="Title"
            className={styles.textField}
            value={this.state.title}
            onChange={this.handleChange('title')}
            type="text"
            margin="normal"
          />

          <TextField
            label="Description"
            className={styles.textField}
            value={this.state.description}
            onChange={this.handleChange('description')}
            type="text"
            multiline
            margin="normal"
          />

          <Select
            placeholder="Category"
            name="category"
            value={this.state.category}
            options={categories}
            onChange={this.handleChangeSelect}
          />

          <TextField
            label="Date"
            placeholder="28/05/2018"
            helperText="Set future date to mark as recurring expense/income"
            className={styles.textField}
            value={this.state.date}
            onChange={this.handleChange('date')}
            type="datetime-local"
            margin="normal"
          />

          <Button className={styles.submitButton} color="primary" type="submit">
            {this.isUpdate ? 'Update' : 'Create'}
          </Button>

          {this.isUpdate && <Button className={styles.deleteButton} type="button" onClick={this.handleDelete}>
            Delete
          </Button>}

        </form>}

      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editor: state.transactionReducer.editor,
  };
};

export default connect(mapStateToProps, { showSnack, loadTransactions, updateEditor, deactivateTransaction, activateTransaction, deleteActive })(Editor);

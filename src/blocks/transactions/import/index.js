import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CloudUpload from '@material-ui/icons/CloudUpload';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Select, Dialog, FileInput } from '../../common';
import { loadTransactions } from '../state';
import { importFromFile } from '../api';
import { showSnack, hideSnack } from '../../app/state';

const bankOptions = [
  {
    label: 'Ing Netherlands',
    value: 'ing.nl',
  },
  {
    label: 'Ing Poland',
    value: 'ing.pl',
  },
  {
    label: 'TBC Bank Georgia',
    value: 'tbcbank',
  }
];

const initialState = {
  modalOpen: false,
  file: '',
  bank: null,
};

class Import extends React.Component {
  state = initialState;

  modalToggle = () => this.setState({ modalOpen: !this.state.modalOpen });

  handleSubmit = () => {

    const { file, bank } = this.state;

    console.log({ file, bank });

    this.props.showSnack('Importing transactions...', 100000, 'progress');

    importFromFile(file, bank).then(() => {
      this.props.hideSnack('progress');
      this.props.showSnack('Succesfully imported all your transactions!');
      this.setState(initialState);
      this.props.loadTransactions();
    }).catch(() => {
      this.props.hideSnack('progress');
      this.props.showSnack('Something went wrong, please check if you picked correct file and bank');
    });

  };

  handleChangeX = (name, value) => this.setState({ [name]: value });

  handleChangeFileInput = (name) => event => this.setState({ [name]: event.target.files[0] });

  render() {

    return (
      <Fragment>
        <ListItem button onClick={this.modalToggle}>
          <ListItemText primary="Import transactions" secondary="Import from CSV/Excel file" />
        </ListItem>

        <Dialog
          title="Upload File With Transactions"
          description="Please choose the file you want to upload. File should be type of .csv or .xlsx."
          open={this.state.modalOpen}
          onClose={this.modalToggle}
          buttonText="Upload"
          onSubmit={this.handleSubmit}
        >
          <Select
            placeholder="Select your bank"
            name={'bank'}
            value={this.state.bank}
            options={bankOptions}
            onChange={this.handleChangeX}
          />

          <FileInput
            accept=".csv, .xlsx, .gsheet"
            onChange={this.handleChangeFileInput('file')}
            model={this.state.file}
            placeholder="Pick the file"
            icon={CloudUpload}
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(null, { showSnack, hideSnack, loadTransactions })(Import);

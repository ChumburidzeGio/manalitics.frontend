import React, { Fragment } from 'react';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import CloudUpload from 'material-ui-icons/CloudUpload';
import { ListItem, ListItemText } from 'material-ui/List';
import { Select, Dialog } from '../../common';
import { loadTransactions } from '../state';
import { importFromFile } from '../api';
import { showSnack, hideSnack } from '../../app/state';
import styles from './styles.css';

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

  handleImport = () => {

    const { file, bank } = this.state;

    this.props.showSnack('Importing transactions...', 100000, 'progress');

    importFromFile(file, bank).then(() => {
      this.props.hideSnack('progress');
      this.props.showSnack('Succesfully imported all your transactions!');
      this.props.loadTransactions();
      this.setState(initialState);
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
          <ListItemText primary="Import data" secondary="Import from CSV/Excel file" />
        </ListItem>
        
        <Dialog
            title="Upload File With Transactions"
            description="Please choose the file you want to upload. File should be type of .csv or .xlsx."
            open={this.state.modalOpen}
            onClose={this.modalToggle}
            buttonText="Upload"
            onSubmit={this.handleImport}
        >
            <Select 
              label={'Select your bank'} 
              name={'bank'} 
              value={this.state.bank} 
              options={bankOptions} 
              onChange={this.handleChangeX} 
            />

            <Fragment>
              <input
                accept=".csv, .xlsx, .gsheet"
                className={styles.hiddenInput}
                onChange={this.handleChangeFileInput('file')}
                id="raised-button-file"
                multiple
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Button component="span" className={styles.uploadButton} fullWidth color="primary">
                  {!this.state.file ? (
                    <Fragment>
                      <CloudUpload className={styles.uploadButtonIcon} />
                      Pick the file
                    </Fragment>
                  ) : this.state.file.name}
                </Button>
              </label>
            </Fragment>
        </Dialog>

      </Fragment>
    );
  }
}

export default connect(null, { showSnack, hideSnack, loadTransactions })(Import);

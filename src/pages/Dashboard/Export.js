import React, { Fragment } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const initialState = {
  modalOpen: false,
  exportLink: null,
};

class Export extends React.Component {
  state = initialState;

  modalToggle = () => this.setState({ modalOpen: !this.state.modalOpen });

  handleImport = () => {

    this.setState({ exportLink: '/export.toFile?token=' });

  };

  handleChangeX = (name, value) => this.setState({ [name]: value });

  render() {

    return (
      <Fragment>
        <Button onClick={this.modalToggle} color="primary">
          Export transactions
        </Button>

        <Dialog
          open={this.state.modalOpen}
          onClose={this.modalToggle}
        >
          <DialogTitle id="alert-dialog-title">Download File With Transactions</DialogTitle>

          <DialogContent>

            <DialogContentText>
              Click download button bellow and get the Excel file with all your transactions.
            </DialogContentText>

          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleCloseExport}>
              Cancel
            </Button>
            <Button href={this.state.exportLink} target="_blank" color="primary">
              Download
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default Export;

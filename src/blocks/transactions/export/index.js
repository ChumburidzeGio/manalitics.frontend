import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { sessionService } from 'redux-react-session';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { api_url } from '../../../helpers';

const initialState = {
  modalOpen: false,
  exportLink: null,
};

class Export extends React.Component {
  state = initialState;

  componentDidMount = () => {
    sessionService.loadSession().then(({ token }) => {
      this.setState({
        exportLink: api_url('/export.toFile', { token })
      });
    });
  }

  modalToggle = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {

    return (
      <Fragment>

        <ListItem button onClick={this.modalToggle}>
          <ListItemText primary="Export transactions" secondary="Export all your transactions into PDF/Excel/CSV" />
        </ListItem>

        {this.state.modalOpen && (<Dialog
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
            <Button onClick={this.modalToggle}>
              Cancel
            </Button>
            <Button href={this.state.exportLink} target="_blank" color="primary">
              Download
            </Button>
          </DialogActions>
        </Dialog>)}
      </Fragment>
    );
  }
}

export default Export;

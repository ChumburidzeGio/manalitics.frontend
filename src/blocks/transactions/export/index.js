import React, { Fragment } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { sessionService } from 'redux-react-session';
import { ListItem, ListItemText } from 'material-ui/List';
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

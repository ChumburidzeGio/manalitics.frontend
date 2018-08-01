import React, { Fragment } from 'react';
import { sessionService } from 'redux-react-session';
import { ListItem, ListItemText } from 'material-ui/List';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Dialog } from '../../common';
import styles from './styles.css';
import { showSnack } from '../../app/state';
import * as authApi from '../api';

class UpdatePassword extends React.Component {
  state = {
    modalOpen: false,
    curentPassword: '',
    newPassword: '',
  };

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = () => {
    const { curentPassword, newPassword } = this.state;

    authApi.update({
      curentPassword, newPassword
    }).then(() => {
      this.modalToggle();
      this.props.showSnack('Password succesfully updated');
    }).catch(() => {
      this.props.showSnack('Something went wrong');
    });
  }

  modalToggle = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {

    return (
      <Fragment>
        <ListItem button onClick={this.modalToggle}>
          <ListItemText primary="Password" secondary="***********" />
        </ListItem>

        <Dialog
          title="Update your password"
          open={this.state.modalOpen}
          onClose={this.modalToggle}
          buttonText="Update"
          onSubmit={this.handleSubmit}
        >
          <TextField
            label="New password"
            autoFocus
            className={styles.textField}
            value={this.state.newPassword}
            onChange={this.handleChange('newPassword')}
            type="password"
            margin="normal"
          />
          <TextField
            label="Current password"
            autoFocus
            className={styles.textField}
            value={this.state.curentPassword}
            onChange={this.handleChange('curentPassword')}
            type="password"
            margin="normal"
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(null, { showSnack })(UpdatePassword);

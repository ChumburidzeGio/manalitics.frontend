import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { Dialog, Input } from '../../common';
import { validate } from '../../../helpers';
import { showSnack } from '../../app/state';
import * as authApi from '../api';

class UpdatePassword extends React.Component {
  state = {
    modalOpen: false,
    curentPassword: '',
    newPassword: '',
    errors: {},
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  setErrors = (errors) => {
    this.setState({ errors });
  }

  handleSubmit = () => {
    const { curentPassword, newPassword } = this.state;

    const validator = validate({ curentPassword, newPassword }, {
      curentPassword: 'required|string',
      newPassword: 'required|string',
    }, {
      curentPassword: 'current password',
      newPassword: 'new password',
    });

    if (validator.fails()) {
      return this.setErrors(validator.errors);
    }

    this.setErrors({});

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
          <Input
            id="newPassword"
            label="New password"
            autoFocus
            value={this.state.newPassword}
            errors={this.state.errors}
            onChange={this.handleChange}
            type="password"
          />
          <Input
            id="curentPassword"
            label="Current password"
            value={this.state.curentPassword}
            errors={this.state.errors}
            onChange={this.handleChange}
            type="password"
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(null, { showSnack })(UpdatePassword);

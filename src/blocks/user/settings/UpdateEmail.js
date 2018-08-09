import React, { Fragment } from 'react';
import { sessionService } from 'redux-react-session';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { Dialog, Input } from '../../common';
import { validate } from '../../../helpers';
import { showSnack } from '../../app/state';
import { update } from '../state';

class UpdateEmail extends React.Component {
  state = {
    modalOpen: false,
    email: '',
    errors: {},
  };

  componentDidMount = () => {
    sessionService.loadUser().then(({ email }) => this.setState({ email }));
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  setErrors = (errors) => {
    this.setState({ errors });
  }

  handleSubmit = () => {
    const { email } = this.state;

    const validator = validate({ email }, {
      email: 'required|email',
    });

    if (validator.fails()) {
      return this.setErrors(validator.errors);
    }

    this.setErrors({});

    this.props.update({ email }).then(() => {
      this.modalToggle();
    }).catch(() => {
      this.props.showSnack('Something went wrong');
    });
  }

  modalToggle = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {

    return (
      <Fragment>
        <ListItem button onClick={this.modalToggle}>
          <ListItemText primary="Email" secondary={this.state.email} />
        </ListItem>

        <Dialog
          title="Update your email"
          open={this.state.modalOpen}
          onClose={this.modalToggle}
          buttonText="Update"
          onSubmit={this.handleSubmit}
        >
          <Input
            id="email"
            label="Email"
            autoFocus
            value={this.state.email}
            errors={this.state.errors}
            onChange={this.handleChange}
            type="email"
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(null, { showSnack, update })(UpdateEmail);

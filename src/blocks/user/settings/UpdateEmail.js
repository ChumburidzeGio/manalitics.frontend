import React, { Fragment } from 'react';
import { sessionService } from 'redux-react-session';
import { ListItem, ListItemText } from 'material-ui/List';
import { Dialog } from '../../common';
import TextField from 'material-ui/TextField';
import styles from './styles.css';
import * as api from '../api';

const initialState = {
  modalOpen: false,
};

class UpdateEmail extends React.Component {
  state = initialState;

  componentDidMount = () => {
    sessionService.loadUser().then(({ email, ...others }) => {
      this.setState({ email, others });
    });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = () => {
    const { email, others } = this.state;

    api.update({ email }).then(() => {
      sessionService.saveUser({ email, ...others });
    }).catch(() => {
      alert('Something went wrong');
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
          <TextField
            label="Email"
            autoFocus
            className={styles.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            type="text"
            margin="normal"
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default UpdateEmail;

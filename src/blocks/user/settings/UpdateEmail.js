import React, { Fragment } from 'react';
import { sessionService } from 'redux-react-session';
import { ListItem, ListItemText } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { Dialog } from '../../common';
import { showSnack } from '../../app/state';
import styles from './styles.css';
import { update } from '../state';

class UpdateEmail extends React.Component {
  state = {
    modalOpen: false,
    email: '',
  };

  componentDidMount = () => {
    sessionService.loadUser().then(({ email }) => this.setState({ email }));
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = () => {
    const { email } = this.state;

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

export default connect(null, { showSnack, update })(UpdateEmail);

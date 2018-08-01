import React, { Fragment } from 'react';
import { sessionService } from 'redux-react-session';
import { ListItem, ListItemText } from 'material-ui/List';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Dialog } from '../../common';
import styles from './styles.css';
import { showSnack } from '../../app/state';
import { update } from '../state';

class UpdateName extends React.Component {
  state = {
    modalOpen: false,
    name: '',
  };

  componentDidMount = () => {
    sessionService.loadUser().then(({ name }) => this.setState({ name }));
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = () => {
    const { name } = this.state;

    this.props.update({ name }).then(() => {
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
          <ListItemText primary="Name" secondary={this.state.name} />
        </ListItem>

        <Dialog
          title="Update your name"
          open={this.state.modalOpen}
          onClose={this.modalToggle}
          buttonText="Update"
          onSubmit={this.handleSubmit}
        >
          <TextField
            label="Name"
            autoFocus
            className={styles.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            type="text"
            margin="normal"
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(null, { showSnack, update })(UpdateName);

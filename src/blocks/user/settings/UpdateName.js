import React, { Fragment } from 'react';
import { sessionService } from 'redux-react-session';
import { ListItem, ListItemText } from 'material-ui/List';
import { Dialog } from '../../common';
import TextField from 'material-ui/TextField';
import styles from './styles.css';

const initialState = {
  modalOpen: false,
};

class UpdateName extends React.Component {
  state = initialState;

  componentDidMount = () => {
    sessionService.loadUser().then((user) => {
      this.setState({
        name: user.name
      });
    });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = () => {
    console.log(12);
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

export default UpdateName;

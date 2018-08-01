import React, { Fragment } from 'react';
import { sessionService } from 'redux-react-session';
import { ListItem, ListItemText } from 'material-ui/List';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Dialog } from '../../common';
import styles from './styles.css';
import { showSnack } from '../../app/state';

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
    const { name, others } = this.state;

    api.update({ name }).then(() => {
      sessionService.saveUser({ name, ...others });
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

export default connect(null, { showSnack })(UpdateName);

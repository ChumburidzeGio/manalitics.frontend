import React, { Fragment } from 'react';
import { sessionService } from 'redux-react-session';
import { ListItem, ListItemText } from 'material-ui/List';
import { connect } from 'react-redux';
import { Dialog, Input } from '../../common';
import { validate } from '../../../helpers';
import { showSnack } from '../../app/state';
import { update } from '../state';

class UpdateName extends React.Component {
  state = {
    modalOpen: false,
    name: '',
    errors: {},
  };

  componentDidMount = () => {
    sessionService.loadUser().then(({ name }) => this.setState({ name }));
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
    const { name } = this.state;

    const validator = validate({ name }, {
      name: 'required|string',
    });

    if (validator.fails()) {
      return this.setErrors(validator.errors);
    }

    this.setErrors({});
    
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
          <Input
            id="name"
            label="Name"
            autoFocus
            value={this.state.name}
            errors={this.state.errors}
            onChange={this.handleChange}
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(null, { showSnack, update })(UpdateName);

import React from 'react';
import TextField from 'material-ui/TextField';
import Typography from '@material-ui/core/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { showSnack } from '../../app/state';
import { logout } from '../state';
import styles from './styles.css';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import * as Transactions from '../../transactions';
import UpdateName from './UpdateName';
import UpdateEmail from './UpdateEmail';

class Settings extends React.Component {
  state = {
    name: 'Giorgi Chumburidze',
    email: 'chumburidze.giorgi@outlook.com',
    view: 'login',
  }

  show = (object) => {
    switch (object) {
      case 'name': {
        return this.isView('signup');
      }
      default: {
        return true;
      }
    }
  }

  getTitle = () => {
    switch (this.state.view) {
      case 'signup': {
        return 'Welcome to Kamo';
      }
      case 'login': {
        return 'Sign in to Account';
      }
    }
  }

  isView = (view) => {
    return this.state.view === view;
  }

  setView = (view) => this.setState({ view });

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    switch (this.state.view) {
      case 'login': {
        const props = {
          email: this.state.email,
          password: this.state.password,
        };

        return this.props.login(props, {
          error: 'Email or password is not correct!'
        });
      }

      case 'signup': {
        const props = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        };

        return this.props.signup(props, {
          error: 'Email or password is not correct!'
        });
      }
    }
  }

  render = () => (
    <div className={styles.root}>

      <div className={styles.container}>

        {/* <div className={styles.section}>
          <Typography variant="title" className={styles.header}>
            Your personal info
          </Typography>

          <form autoComplete="off" className={styles.form} onSubmit={this.handleSubmit}>
            <TextField
              label="Name"
              className={styles.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              type="text"
              margin="normal"
            />

            <TextField
              id="email"
              label="Email"
              className={styles.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              type="email"
              margin="normal"
            />

            <Button raised color="primary" className={styles.button} type="submit">
              Update
        </Button>

          </form>

        </div>

        <div className={styles.section}>

          <Typography variant="title" className={styles.header}>
            Your password
          </Typography>

          <form autoComplete="off" className={styles.form} onSubmit={this.handleSubmit}>
            <TextField
              id="new_pass"
              label="New password"
              className={styles.textField}
              value={this.state.new_pass}
              onChange={this.handleChange('new_pass')}
              type="text"
              margin="normal"
            />

            <TextField
              id="repeat_pass"
              label="Repeat password"
              className={styles.textField}
              value={this.state.repeat_pass}
              onChange={this.handleChange('repeat_pass')}
              type="email"
              margin="normal"
            />

            <TextField
              id="current_pass"
              label="Current password"
              className={styles.textField}
              value={this.state.current_pass}
              onChange={this.handleChange('current_pass')}
              type="email"
              margin="normal"
            />

            <Button raised color="primary" className={styles.button} type="submit">
              Update
          </Button>

          </form>
        </div> */}

        <Typography variant="title" className={styles.header}>
            Settings
        </Typography>

        <List>
          <ListSubheader component="div" className={styles.subheader}>Personal details</ListSubheader>
          <UpdateName />
          <UpdateEmail />
          <ListSubheader component="div" className={styles.subheader}>Account</ListSubheader>

          <ListItem>
            <ListItemText primary="Account currency" secondary="Euro (EUR)" />
          </ListItem>

          <ListSubheader component="div" className={styles.subheader}>Import/Export</ListSubheader>

          <Transactions.Import />

				  <Transactions.Export />

          <ListSubheader component="div" className={styles.subheader}>Others</ListSubheader>

          <ListItem button onClick={this.props.logout}>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>

      </div>
    </div>
  );
}

export default connect(null, { showSnack, logout })(Settings);

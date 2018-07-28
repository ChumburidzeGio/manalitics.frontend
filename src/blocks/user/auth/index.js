import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { showSnack } from '../../app/state';
import { login, signup } from '../state';
import styles from './styles.css';

class Auth extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
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
      <Paper className={styles.container} elevation={4}>
        <Typography variant="headline" component="h3" className={styles.header}>
          Welcome to Kamo
        </Typography>

        <form autoComplete="off" className={styles.form} onSubmit={this.handleSubmit}>
          {this.show('name') && <TextField
            label="Name"
            className={styles.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            type="text"
            margin="normal"
          />}

          {this.show('email') && <TextField
            id="email"
            label="Email"
            className={styles.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            type="email"
            margin="normal"
          />}

          {this.show('password') && <TextField
            id="password"
            label="Password"
            className={styles.textField}
            value={this.state.password}
            onChange={this.handleChange('password')}
            type="password"
            margin="normal"
          />}

          <Button raised color="primary" className={styles.button} type="submit">
            Submit
          </Button>

          {!this.isView('login') && <Button className={styles.buttonSecondary} type="submit" onClick={() => this.setView('login')}>
            Sign In
          </Button>}

          {this.isView('login') && <Button className={styles.buttonSecondary} type="submit" onClick={() => this.setView('signup')}>
            Sign Up
          </Button>}

        </form>
      </Paper>
  );
}

export default connect(null, { showSnack, login, signup })(Auth);

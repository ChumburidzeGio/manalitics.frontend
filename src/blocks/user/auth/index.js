import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { Paper, Input } from '../../common';
import { validate } from '../../../helpers';
import { showSnack } from '../../app/state';
import { login, signup } from '../state';
import styles from './styles.css';

class Auth extends React.Component {
  state = {
    errors: {},
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

  handleChangeInput = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  setErrors = (errors) => {
    this.setState({ errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const rules = {
      password: 'required',
      email: 'required|email',
    };

    if(this.state.view === 'login') {
      return this.handleSignin(this.state, rules);
    }
    
    this.handleSignup(this.state, rules);
  }

  handleSignin = (data, rules) => {
    const props = {
      email: data.email,
      password: data.password,
    };

    const validator = validate(props, rules);

    if (validator.fails()) {
      return this.setErrors(validator.errors);
    }

    this.setErrors({});

    return this.props.login(props, {
      error: 'Email or password is not correct'
    });
  }

  handleSignup = (data, rules) => {
    const props = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const validator = validate(props, {
      name: 'required|min:3',
      ...rules
    });

    if (validator.fails()) {
      return this.setErrors(validator.errors);
    }

    this.setErrors({});

    return this.props.signup(props, {
      error: 'Please try with different email'
    });
  }

  render = () => (
    <Paper className={styles.container} raised>
      <Typography variant="title" className={styles.header}>
        {this.isView('login') ? 'Sign In' : 'Create Account'}
      </Typography>
      <Typography variant="title" className={styles.subHeader}>
        to continue to Kamo
      </Typography>

      <form autoComplete="off" className={styles.form} onSubmit={this.handleSubmit}>
        <Input
          id="name"
          label="Name"
          show={this.show('name')}
          value={this.state.name}
          errors={this.state.errors}
          onChange={this.handleChangeInput}
        />

        <Input
          id="email"
          label="Email"
          show={this.show('email')}
          value={this.state.email}
          errors={this.state.errors}
          onChange={this.handleChangeInput}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          show={this.show('password')}
          value={this.state.password}
          errors={this.state.errors}
          onChange={this.handleChangeInput}
        />

        <Button raised color="primary" className={styles.button} type="submit">
          Submit
        </Button>

        {!this.isView('login') && <Button className={styles.buttonSecondary} type="submit" onClick={() => this.setView('login')}>
          Sign in instead
        </Button>}

        {this.isView('login') && <Button className={styles.buttonSecondary} type="submit" onClick={() => this.setView('signup')}>
          Create account
          </Button>}

      </form>
    </Paper>
  );
}

export default connect(null, { showSnack, login, signup })(Auth);

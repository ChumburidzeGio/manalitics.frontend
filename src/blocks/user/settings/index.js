import React from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import { logout } from '../state';
import { Paper } from '../../common';
import styles from './styles.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import * as Transactions from '../../transactions';
import UpdateName from './UpdateName';
import UpdateEmail from './UpdateEmail';
import UpdateCurrency from './UpdateCurrency';
import UpdatePassword from './UpdatePassword';

class Settings extends React.Component {
  componentDidMount = () => {
    sessionService.loadUser().then((user) => this.setState(user));
  }

  render = () => (
    <Paper className={styles.container} raised>

      <Typography variant="title" className={styles.header}>
        Settings
      </Typography>

      <List>
        <ListSubheader component="div" className={styles.subheader}>Personal details</ListSubheader>

        <UpdateName />

        <UpdateEmail />

        <ListSubheader component="div" className={styles.subheader}>Account</ListSubheader>

        <UpdatePassword />

        <UpdateCurrency />

        <ListSubheader component="div" className={styles.subheader}>Import/Export</ListSubheader>

        <Transactions.Import />

        <Transactions.Export />

        <ListSubheader component="div" className={styles.subheader}>Others</ListSubheader>

        <ListItem button onClick={this.props.logout}>
          <ListItemText primary="Sign out" />
        </ListItem>
      </List>

    </Paper>
  );
}

export default connect(null, { logout })(Settings);

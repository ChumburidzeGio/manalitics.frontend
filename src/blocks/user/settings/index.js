import React from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import { logout } from '../state';
import styles from './styles.css';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
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
    <div className={styles.root}>

      <div className={styles.container}>

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

      </div>
    </div>
  );
}

export default connect(null, { logout })(Settings);

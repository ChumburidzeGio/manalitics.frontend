import React from 'react';
import PropTypes from 'prop-types';
import SnackbarContent from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { hideSnack } from '../state';
import styles from './styles.css';

class Snackbar extends React.Component {
  handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.hideSnack(this.props.id);
  }

  render() {
    const { id, duration, message } = this.props;
    return (
      <SnackbarContent
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={duration}
        onClose={this.handleClose}
        open
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id="message-id">
            {id === 'progress' ? <CircularProgress className={styles.progress} size={17} /> : ''}
            {message}
          </span>}
        action={[
          <Button
            key="hide"
            aria-label="Hide"
            color="inherit"
            onClick={this.handleClose}
            dense
          >
            Hide
          </Button>,
        ]}
      />
    );
  }
};

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  hideSnack: PropTypes.func.isRequired,
};

Snackbar.defaultProps = {
  duration: 3000
};

export default connect(null, { hideSnack })(Snackbar);

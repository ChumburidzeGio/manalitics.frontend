import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { logout } from '../state';

const Nav = ({ logout }) => (
    <Button onClick={logout} color="inherit">Logout</Button>
);

Nav.propTypes = {
    logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Nav);
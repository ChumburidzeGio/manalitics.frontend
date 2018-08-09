import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router';

const Nav = () => (
    <Button color="inherit" component={Link} to="/settings">Settings</Button>
);

export default Nav;
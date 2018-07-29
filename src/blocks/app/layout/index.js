import React, { Fragment } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Snackbar from '../snackbar';
import styles from './styles.css';
import { UserNav } from '../../user';
import Reboot from 'material-ui/Reboot';

const Layout = ({ snackQueue, children, backButton, headerText, withHeader }) => {
    const extraProps = headerText() ? { onClick: () => backButton } : {};

    return (
        <Fragment>
            <Reboot />
            {withHeader && (
                <AppBar position="static" className={styles.appBar}>
                    <Toolbar className={styles.toolbar}>
                        {headerText() && <IconButton color="inherit" aria-label="Go back" onClick={backButton}>
                            <ArrowBackIcon />
                        </IconButton>}
                        <Typography type="title" color="inherit" className={styles.logo} component={Link} to="/" {...extraProps}>
                            {headerText() ? headerText() : 'Kamo'}
                        </Typography>
                        <UserNav />
                    </Toolbar>
                </AppBar>
            )}

            {children}

            {snackQueue.map((item) =>
                <Snackbar message={item.label} key={item.id} id={item.id} duration={item.duration} />
            )}
        </Fragment>
    );
};

Layout.propTypes = {
    withHeader: PropTypes.bool,
    headerText: PropTypes.func,
    backButton: PropTypes.func,
};

Layout.defaultProps = {
    headerText: () => { },
    backButton: () => { },
    withHeader: true
};

const mapStateToProps = (state) => ({
    snackQueue: state.snackbarReducer.queue,
});

export default connect(mapStateToProps)(Layout);
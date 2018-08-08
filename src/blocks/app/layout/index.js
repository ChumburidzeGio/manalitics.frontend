import React, { Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Snackbar from '../snackbar';
import styles from './styles.css';
import * as User from '../../user';
import CssBaseline from '@material-ui/core/CssBaseline';

const Layout = ({ snackQueue, children, backButton, headerText, withHeader }) => {
    const extraProps = headerText() ? { onClick: () => backButton } : {};

    return (
        <Fragment>
            <CssBaseline />
            {withHeader && (
                <div className={styles.appbar}>
                    <div className={styles.toolbar}>
                        {headerText() && <IconButton color="inherit" aria-label="Go back" onClick={backButton}>
                            <ArrowBackIcon />
                        </IconButton>}
                        <Typography variant="title" color="inherit" className={styles.logo} component={Link} to="/" {...extraProps}>
                            {headerText() ? headerText() : 'Kamo'}
                        </Typography>
                        <User.Nav />
                    </div>
                </div>
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
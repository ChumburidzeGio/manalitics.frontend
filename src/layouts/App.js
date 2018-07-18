import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Button from 'material-ui/Button'
import withRoot from '../withRoot';
import Snackbar from '../components/Snackbar';
import { removeAccessToken } from '../auth'
import styles from './App.css';

class App extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
            withHeader: props.withHeader !== undefined ? props.withHeader : true,
            headerText: props.headerText ? props.headerText : () => {},
            backButton: props.backButton,
        }
    }

    handleBackButton() {
        return this.state.headerText ? this.state.backButton() : null
    };

    logOut() {
        removeAccessToken()
        browserHistory.push('/login')
    };

    render() {

        const { snackQueue, children } = this.props;

        return (
            <div className={styles.root}>

                {this.state.withHeader && <AppBar position="static">
                    <Toolbar className={styles.toolbar}>
                        {this.state.headerText() &&
                            <IconButton color="inherit" aria-label="Go back" onClick={this.handleBackButton}>
                                <ArrowBackIcon />
                        </IconButton>}

                        <Typography type="title" color="inherit" className={styles.logo} component={Link} to="/" onClick={this.handleBackButton}>
                            {this.state.headerText() ? this.state.headerText() : 'Kamo' }
                        </Typography>

                        <Button onClick={this.logOut} color="inherit">Logout</Button>

                    </Toolbar>
                </AppBar>}

                {children}

                {snackQueue.map((item) =>
                    <Snackbar message={item.label} key={item.id} id={item.id} duration={item.duration}/>
                )}

            </div>
        );
    }
}

App.propTypes = {
    withHeader: PropTypes.bool,
    headerText: PropTypes.string,
    backButton: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => ({
    snackQueue: state.snackbarReducer.queue,
});

export default withRoot(connect(mapStateToProps)(App));
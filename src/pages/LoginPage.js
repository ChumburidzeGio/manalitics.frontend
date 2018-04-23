import React from 'react'
import withRoot from '../withRoot'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import App from '../layouts/App'
import client from '../client'
import { connect } from 'react-redux'
import { showSnack } from '../state/snackbarActions'
import { setAccessToken } from '../auth'
import { browserHistory } from 'react-router'

const styles = ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '500px',
        margin: '20vh auto 0',
        padding: '17px 30px 30px',
        borderRadius: '3px'
    },
    header: {
        width: '100%',
        fontSize: '1.35rem',
        textAlign: 'center',
        fontWeight: '500',
        color: '#212b35',
        paddingTop: '12px',
        paddingBottom: '3px',
    },
    form: {
        display: 'block',
        width: '100%'
    },
    textField: {
        width: '100%'
    },
    button: {
        marginTop: '30px',
        width: '100%',
    },
    credits: {
        display: 'block',
        textAlign: 'center',
        marginTop: '15px'
    },
})

class LoginPage extends React.Component {

    state = {
        email: '',
        password: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit = (e) =>
    {
        e.preventDefault();

        client().post('auth/login', this.state).then(({data}) => {
            setAccessToken(data.data.token, data.data.expiresIn);
            this.props.showSnack(data.message);

            const access_token = localStorage.getItem('access_token');
            
            if(access_token === data.data.token) {
                browserHistory.push('/');
            }
        })
        .catch((error) => {
            if(error.response.data.message) {
                return this.props.showSnack(error.response.data.message);
            }
            this.props.showSnack('Something went wrong');
        });
    }

    render() {

        const { classes } = this.props;

        return (
            <App withHeader={false}>

                <Paper className={classes.container} elevation={4}>

                    <Typography variant="headline" component="h3" className={classes.header}>
                        Sign in to your Manalitics
                    </Typography>

                    <form autoComplete="off" className={classes.form} onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            type="email"
                            margin="normal"
                        />
                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            type="password"
                            margin="normal"
                        />
                        <Button raised color="primary" className={classes.button} type="submit">
                            Sign In
                        </Button>
                    </form>
                </Paper>

                <Typography className={classes.credits}>
                    Manalitics by <a href="https://nixler.ge" target="_blank">Nixler</a>
                </Typography>

            </App>
        );
    }
}

export default withStyles(styles)(withRoot(
    connect(null, {showSnack})(LoginPage)
));

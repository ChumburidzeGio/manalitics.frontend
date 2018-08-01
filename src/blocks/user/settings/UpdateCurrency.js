import React, { Fragment } from 'react';
import { sessionService } from 'redux-react-session';
import { ListItem, ListItemText } from 'material-ui/List';
import { Select, Dialog } from '../../common';
import * as transactionsApi from '../../transactions/api';

const initialState = {
    modalOpen: false,
    currency: 'EUR'
};

class UpdateCurrency extends React.Component {
    state = initialState;

    componentDidMount = () => {
        sessionService.loadUser().then(({ currency }) => {
            this.setState({ currency });
        });

        transactionsApi.getCurrencies().then((currencyOptions) => {
            this.setState({ currencyOptions });
        });
    }

    handleChangeX = (name, value) => this.setState({ [name]: value })

    handleSubmit = () => {
        console.log(12);
    }

    modalToggle = () => this.setState({ modalOpen: !this.state.modalOpen });

    render() {

        return (
            <Fragment>
                <ListItem button onClick={this.modalToggle}>
                    <ListItemText primary="Account currency" secondary={this.state.currency} />
                </ListItem>

                <Dialog
                    title="Update your main currency"
                    open={this.state.modalOpen}
                    onClose={this.modalToggle}
                    buttonText="Update"
                    onSubmit={this.handleSubmit}
                >
                    <Select
                        placeholder="Select currency"
                        name={'currency'}
                        value={this.state.currency}
                        options={this.state.currencyOptions}
                        onChange={this.handleChangeX}
                    />
                </Dialog>
            </Fragment>
        );
    }
}

export default UpdateCurrency;

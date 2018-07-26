import React from 'react';
import { connect } from 'react-redux';
import { loadTransactions } from '../../state/transactions';
import styles from './Dashboard.css';
import Input from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

class Search extends React.Component {
    state = {
        query: '',
    };

    onChange = (event) => {
        let query = event.target.value;

        this.props.loadTransactions({ query });

        this.setState({ query });
    }

    render = () => (
        <FormControl fullWidth>
            <Input
                id="name-simple"
                type="search"
                autoFocus
                placeholder="Search for resources and product types"
                value={this.state.query}
                onChange={(e) => this.onChange(e)}
                className={styles.searchInput}
            />
        </FormControl>
    );
}

export default connect(null, { loadTransactions })(Search);

import React from 'react';
import { connect } from 'react-redux';
import Input from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { loadTransactions } from '../state';
import styles from './styles.css';

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
                placeholder="Search for transactions"
                value={this.state.query}
                onChange={(e) => this.onChange(e)}
                className={styles.input}
            />
        </FormControl>
    );
}

export default connect(null, { loadTransactions })(Search);

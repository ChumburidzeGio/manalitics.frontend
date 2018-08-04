import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import styles from './styles.css';
import classnames from 'classnames';

export default class Input extends Component {
    render() {
        const { id, onChange, errors, show, type, margin, className, ...others } = this.props;
        const hasErrors = errors.get && errors.get(id).length > 0;
        const helperText = hasErrors ? errors.first(id) : '';
        
        return show && (
            <TextField
                autoComplete={id}
                className={classnames(styles.root, className)}
                error={hasErrors}
                helperText={helperText}
                onChange={(event) => onChange(id, event.target.value)}
                type={type || 'text'}
                margin={margin || 'normal'}
                {...others}
            />
        );
    }
}
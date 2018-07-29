import React from 'react';
import PropTypes from 'prop-types';
import { Switch as MuiSwitch } from 'material-ui';
import { FormControlLabel, FormGroup } from 'material-ui/Form';

class Switch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked,
    };
  }

  handleChange() {
    this.setState({ checked: !this.state.checked });
    this.props.handleChange(this.props.id);
  }

  render() {
    return (
      <FormGroup>
        {this.state.checked !== undefined && <FormControlLabel
          label={this.props.label}
          control={
            <MuiSwitch
              onChange={this.handleChange}
              checked={this.state.checked}
            />
          }
        />}
      </FormGroup>
    );
  }
}

Switch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Switch;

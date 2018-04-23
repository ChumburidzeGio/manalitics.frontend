import React from 'react';
import PropTypes from 'prop-types';
import { Switch as MuiSwitch } from 'material-ui';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import withRoot from '../withRoot';

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
          control={
            <MuiSwitch
              onChange={this.handleChange}
              checked={this.state.checked}
            />
          }
          label={this.props.label}
        />}
      </FormGroup>
    );
  }
}

Switch.propTypes = {
  id: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withRoot(Switch);

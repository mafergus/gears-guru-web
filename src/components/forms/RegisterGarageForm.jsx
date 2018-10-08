import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { Form, Text, Phone, Password, TextInput } from 'mf-common-components';

export default class RegisterGarageForm extends React.Component {

  onSubmit = values => {
    debugger;
    console.log("WTF SON");
  }

  listEm = countries => {
  }

  render() {
    const { onCancel, style } = this.props;

    return (
      <Form
        style={style}
        onSubmit={this.onSubmit}
      >
        <Text
          style={{ width: "100%", marginRight: 14 }}
          errorText="Enter business name"
          placeholder="Business name"
          name="businessName"
          required
        />
        <Phone
          style={{ width: "100%", marginRight: 14 }}
          name="phoneNumber"
          required
        />
        {/*<PhoneNumberInput onListCountries={this.listEm} />*/}
        <Text
          style={{ width: "100%", marginRight: 14 }}
          errorText="Enter username"
          placeholder="Username"
          name="username"
          required
        />
        <Password
          style={{ width: "100%", marginRight: 14 }}
          name="password"
          required
        />
        <Password
          style={{ width: "100%", marginRight: 14 }}
          name="confirmPassword"
          required
        />
        <Button
          onClick={onCancel}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    );
  }
}

RegisterGarageForm.propTypes = {
  style: PropTypes.object,
};
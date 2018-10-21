import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { Form, Text, Phone } from 'gg-common/form';
import { SelectInput } from 'components/ui/selects';
import { gray } from 'util/colors';

export default class BookingForm extends React.Component {

  state = {
    carModels: [],
    name: '',
    phoneNumber: '',
    selectedMake: '42',
    selectedModel: '42',
  };
  
  static propTypes = {
    carMakes: PropTypes.array,
    onSubmit: PropTypes.func.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    carMakes: [],
    style: {},
  };

  handleChangeMake = event => {
    const uid = event.target.value;
    const { cars } = this.props;

    this.setState({
      selectedMake: uid,
      carModels: uid === '42' ? [] : cars[uid].models.sort((a, b) => a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)),
    });
  }

  handleChangeModel = event => {
    const carModel = event.target.value;

    this.setState({ selectedModel: carModel });
  }

  onSubmit = () => {
    const { name, phoneNumber, selectedMake, selectedModel } = this.state;
    const { onSubmit } = this.props;

    onSubmit({
      name,
      phoneNumber,
      selectedMake,
      selectedModel
    });
  }

  onUpdate = (event, prop) => {
    const newState = {};
    newState[prop] = event.target.value;
    this.setState(newState);
  }

  render() {
    const {
      carMakes,
      onSubmit,
      style
    } = this.props;

    const {
      carModels,
      name,
      phoneNumber,
      selectedMake,
      selectedModel
    } = this.state;

    const onPhoneNumberChange = (countryCode, phoneNumber) => {
      // const number = countryCode + phoneNumber;
      // const isValid = this.validatePhoneNumber(number);

      // this.setState({ phoneNumber: countryCode + phoneNumber, isValid: true });
    }

    return (
      <Form style={style}>
        <Text
          name="name"
          placeholder="Name"
          style={{ width: "calc(100% - 70px)" }}
          value={name}
          onChange={event => this.onUpdate(event, 'name')}
        />
        <Phone
          name="phoneNumber"
          placeholder="Phone number"
          style={{ width: "calc(100% - 70px)" }}
          value={phoneNumber}
          onChange={event => this.onUpdate(event, 'phoneNumber')}
        />
        <SelectInput
          style={{ width: "calc(100% - 70px)", marginBottom: 7 }}
          selected={selectedMake}
          handleChange={this.handleChangeMake}
          id="make"
        >
          <MenuItem key="42" value="42" style={{ color: gray }}>Select Car</MenuItem>
          {carMakes.map(item => <MenuItem key={item.uid} value={item.uid}>{item.name}</MenuItem>)}
        </SelectInput>
        <SelectInput
          style={{ width: "calc(100% - 70px)" }}
          selected={selectedModel}
          handleChange={this.handleChangeModel}
          id="model"
        >
          <MenuItem key="42" value="42" style={{ color: gray }}>Select Model</MenuItem>
          {carModels.map(item => <MenuItem key={item.uid} value={item.uid}>{item.name}</MenuItem>)}
        </SelectInput>
        {/*<PhoneNumberTextField
          error={false}
          preferredCountries={['US', 'GB']}
          placeholder={'555-555-5555'}
          onChange={this.onPhoneNumberChange}
        />*/}
        <Button 
         variant="raised"
         color="secondary"
         style={{ margin: "30px 0px" }}
         onClick={this.onSubmit}
        >
         COMPLETE RESERVATION
       </Button>
      </Form>
    );
  }
}

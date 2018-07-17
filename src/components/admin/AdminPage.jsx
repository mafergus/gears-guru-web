import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import GarageList from 'components/home/GarageList';
import firebase from 'datastore/database';
import { AL_QUOZ_LOCATION } from 'util/constants';

function mapStateToProps(state, props) {
  return {
    garages: Object.entries(state.garages).map(entry => {
      const garage = entry[1];
      return { ...garage, uid: entry[0] };
    }),
  };
}

class AdminPage extends React.Component {

  static propTypes = {
    garages: PropTypes.array,
  };

  static defaultProps = {
    garages: [],
  };

  addGarage = () => {
    const { history } = this.props;

    const newGarageKey = firebase.database().ref('garages').push().key;
    const data = {};
    data.hours = [
      { close: '', open: ''},
      { close: '', open: ''},
      { close: '', open: ''},
      { close: '', open: ''},
      { close: '', open: ''},
      { close: '', open: ''},
      { close: '', open: ''},
    ];
    data.locations = [
      {
        lat: AL_QUOZ_LOCATION[0],
        long: AL_QUOZ_LOCATION[1],
        address: 'Dubai',
        neighborhood: 'Al Quoz',
      },
    ];
    data.categories = {
      categoryId1: true,
      categoryId2: true,
      categoryId3: true,
    };
    firebase.database().ref('garages/' + newGarageKey)
    .update(data)
    .then(() => history.push('/admin/garage/' + newGarageKey));
  }

  render() {
    const { garages } = this.props;

    return (
      <div style={{ width: "100%", height: "100%", padding: 30 }}>
        <div style={{ display: "flex", marginBottom: 30 }}>
          <h1>Garages</h1>
          <Button
            style={{ height: 30, minWidth: 130, marginLeft: 15 }}
            variant="raised"
            onClick={this.addGarage}
            color="secondary"
          >
            Add Garage
          </Button>
        </div>
        <GarageList garages={garages} urlBase="admin/garage/"/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AdminPage);
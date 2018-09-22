import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import firebase from 'datastore/database';
import { AL_QUOZ_LOCATION } from 'util/constants';
import history from 'datastore/history';
import { GarageList } from 'components/garage-list';

function mapStateToProps(state, props) {
  return {
    browser: state.browser,
    garages: Object.entries(state.garages).map(entry => {
      const garage = entry[1];
      return { ...garage, uid: entry[0] };
    }),
  };
}

class AdminPage extends React.Component {

  static propTypes = {
    browser: PropTypes.object.isRequired,
    garages: PropTypes.array,
  };

  static defaultProps = {
    garages: [],
  };

  addGarage = () => {
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
      categoryId4: true,
      categoryId5: true,
      categoryId6: true,
      categoryId7: true,
      cid8: true,
      cid9: true,
      cid10: true,
      cid11: true,
      cid12: true,
      cid14: true,
      cid15: true,
      cid16: true,
    };
    firebase.database().ref('garages/' + newGarageKey)
    .update(data)
    .then(() => history.push('/admin/garage/' + newGarageKey));
  }

  render() {
    const { browser, garages } = this.props;

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
        <GarageList onItemClick={garageUid => history.push('/admin/garage/' + garageUid)} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(AdminPage);
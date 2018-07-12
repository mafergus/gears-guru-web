import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import GarageList from 'components/home/GarageList';
import firebase from 'datastore/database';

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
    history.push('/admin/garage/' + newGarageKey);
  }

  render() {
    const { garages } = this.props;

    return (
      <div style={{ width: "100%", height: "100%", backgroundColor: "red", padding: 30 }}>
        <div>
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
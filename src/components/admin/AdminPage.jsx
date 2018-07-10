import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GarageList from 'components/home/GarageList';
import Button from '@material-ui/core/Button';

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

  render() {
    const { garages, history } = this.props;

    return (
      <div style={{ width: "100%", height: "100%", backgroundColor: "red", padding: 30 }}>
        <h1>Garages</h1>
        <Button
          style={{ height: 30, minWidth: 130 }}
          variant="raised"
          onClick={() => history.push("/admin/garage/new")}
          color="secondary"
        >
          Add Garage
        </Button>
        <GarageList garages={garages}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AdminPage);
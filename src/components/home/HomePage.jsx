import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SimpleMap from 'components/map/SimpleMap';
import GarageList from 'components/home/GarageList';
import { AL_QUOZ_LOCATION } from 'util/constants';
import { primary } from 'util/colors';
import ServiceSelector from 'components/home/ServiceSelector';

function mapStateToProps(state, props) {
  return {
    garages: Object.entries(state.garages).map(entry => {
      const garage = entry[1];
      return { ...garage, uid: entry[0] };
    }),
  };
}

class HomePage extends React.Component {

  static propTypes = {
    garages: PropTypes.array,
  };

  static defaultProps = {
    garages: [],
  };

  render() {
    const { garages } = this.props;

    return (
      <div style={{ height: "100%", width: "100%", backgroundColor: "red" }}>
        <div 
          style={{ 
            width: "100%",
            height: 450,
            marginBottom: 55,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center" 
          }}
        >
          <SimpleMap 
            center={{ lat: AL_QUOZ_LOCATION[0], lng: AL_QUOZ_LOCATION[1] }}
            style={{ 
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <div
            style={{ 
              height: "100%",
              width: "100%",
              backgroundColor: primary[300],
              opacity: 0.4,
              pointerEvents: "none",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0 
            }} 
          />
          <ServiceSelector onSubmit={service => alert(service.uid + " " + service.name)}/>
        </div>
        <GarageList garages={garages}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomePage);
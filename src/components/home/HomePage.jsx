import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SimpleMap from 'components/map/SimpleMap';
import { AL_QUOZ_LOCATION } from 'util/constants';
import { primary } from 'util/colors';
import ServiceSelector from 'components/home/ServiceSelector';
import { GarageList, GarageListFilters } from 'components/garage-list';
import history from 'datastore/history';
import MapSection from 'components/map/container/MapSection';

function mapStateToProps(state, props) {
  return {
    browser: state.browser,
  };
}

class HomePage extends React.Component {

  static propTypes = {
    browser: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      location: null,
    };
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos);
      this.setState({
        location: pos,
      });
    });
  }

  render() {
    const { browser } = this.props;
    const { location } = this.state;
    const mapCenter = location ?
      { lat: location.coords.latitude, lng: location.coords.longitude } :
      { lat: AL_QUOZ_LOCATION[0], lng: AL_QUOZ_LOCATION[1] };

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <div 
          style={{ 
            width: "100%",
            height: 450,
            marginBottom: 25,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center" 
          }}
        >
          <MapSection
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
        <GarageListFilters
          style={{ marginBottom: 10 }}
        />
        <GarageList
          browser={browser}
          currentLocation={location}
          onItemClick={garageUid => history.push('garage/' + garageUid)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomePage);
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SimpleMap from 'components/map/SimpleMap';
import GarageList from 'components/home/GarageList';
import { AL_QUOZ_LOCATION } from 'util/constants';
import { primary } from 'util/colors';
import ServiceSelector from 'components/home/ServiceSelector';
import GarageListFilters from 'components/GarageListFilters';

function mapStateToProps(state, props) {
  return {
    browser: state.browser,
    garages: Object.entries(state.garages).map(entry => entry[1]),
  };
}

class HomePage extends React.Component {

  static propTypes = {
    browser: PropTypes.object.isRequired,
    garages: PropTypes.array,
  };

  static defaultProps = {
    garages: [],
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
    const { browser, garages } = this.props;
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
          <SimpleMap 
            center={mapCenter}
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
        <GarageListFilters style={{ marginBottom: 10 }}/>
        <GarageList browser={browser} garages={garages} location={location} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomePage);
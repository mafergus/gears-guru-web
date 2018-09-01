import React from 'react';
import PropTypes from 'prop-types';

import SimpleMap from 'components/map/SimpleMap';
import { AL_QUOZ_LOCATION } from 'util/constants';
import { text, darkGray, gray }  from 'util/colors';
import MapMarker from 'components/map/MapMarker';

const styles = {
  container: {
    width: "100%",
    paddingTop: 30,
  },
  title: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: "1.6em",
    color: text.darkGray,
    paddingTop: 30,
    marginBottom: 55,
  },
}

export default function MapSection({ style, locations }) {
  const mapCenter = { lat: AL_QUOZ_LOCATION[0], lng: AL_QUOZ_LOCATION[1] }

  return (
    <div style={{ ...styles.container, ...style }}>
      <h4 style={styles.title}>Locations Near You</h4>
      <SimpleMap
        center={mapCenter}
        style={{ height: 350 }}
        options={{ scrollwheel: false }}
      >
        {locations.map(item => <MapMarker key={item.lat + item.long} lat={parseFloat(item.lat)} lng={parseFloat(item.long)}/>)}
      </SimpleMap>
    </div>
  )
}

MapSection.propTypes = {
  style: PropTypes.object,
};

MapSection.defaultProps = {
  style: {},
};
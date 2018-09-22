import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import GarageListItem from 'components/garage-list/GarageListItem';
import { getDistanceFromLatLonInKm } from 'util/util';

export default function GarageListView({ browser, currentLocation, garages, onItemClick, style }) {
  return (
    <Grid
      style={{ ...style }}
      container
    >
      {garages.map(garage => {
        const distance = currentLocation ? getDistanceFromLatLonInKm(garage.locations[0].lat, 
          garage.locations[0].long, 
          currentLocation.coords.latitude, 
          currentLocation.coords.longitude) : null;

        return <GarageListItem 
          key={garage.uid}
          browser={browser}
          garage={garage}
          distance={distance}
          onItemClick={onItemClick}
        />;
      })}
    </Grid>
  );
}

GarageListView.propTypes = {
  browser: PropTypes.object.isRequired,
  currentLocation: PropTypes.object.isRequired,
  garages: PropTypes.array,
  onItemClick: PropTypes.func,
  style: PropTypes.object,
};

GarageListView.defaultProps = {
  garages: [],
  onItemClick: () => {},
  style: {},
};
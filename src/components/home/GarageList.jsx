import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import GarageListItem from 'components/home/GarageListItem';
import { getDistanceFromLatLonInKm } from 'util/util';

export default class GarageList extends React.Component {
  
  static propTypes = {
    browser: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    garages: PropTypes.array,
    style: PropTypes.object,
    urlBase: PropTypes.string,
  };

  static defaultProps = {
    garages: [],
    style: {},
    urlBase: 'garage/',
  };

  render() {
    const { browser, garages, location, style, urlBase } = this.props;

    return (
      <Grid
        style={{ ...style }}
        container
      >
        {garages.map(garage => {
          const distance = location ? getDistanceFromLatLonInKm(garage.locations[0].lat, 
            garage.locations[0].long, 
            location.coords.latitude, 
            location.coords.longitude) : null;

          return <GarageListItem 
            key={garage.uid}
            browser={browser}
            garage={garage}
            distance={distance}
            urlBase={urlBase}
          />;
        })}
      </Grid>
    );
  }
}
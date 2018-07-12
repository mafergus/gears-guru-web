import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import GarageListItem from 'components/home/GarageListItem';

export default class GarageList extends React.Component {
  
  static propTypes = {
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
    const { garages, style, urlBase } = this.props;

    return (
      <Grid
        style={{ ...style }}
        container
      >
        {garages.map(garage => <GarageListItem garage={garage} urlBase={urlBase}/>)}
      </Grid>
    );
  }
}
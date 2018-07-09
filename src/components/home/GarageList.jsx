import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import GarageListItem from 'components/home/GarageListItem';

export default class GarageList extends React.Component {
  
  static propTypes = {
    garages: PropTypes.object,
    style: PropTypes.class,
  };

  static defaultProps = {
    garages: {}
  };

  render() {
    const { garages, style } = this.props;

    return (
      <Grid
        style={{ ...style }}
        container
      >
        {garages.map(garage => <GarageListItem garage={garage}/>)}
      </Grid>
    );
  }
}
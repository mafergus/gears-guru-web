import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

export default class GarageList extends React.Component {
  
  static propTypes = {
    style: PropTypes.class,
  };

  renderItem = garage => {
    return <Grid item md={3} style={{ padding: 20, height: 150, backgroundColor: "green", display: "relative" }}>
      <div style={{ backgroundColor: "purple", height: 50, width: 50, top: 10, right: 10, position: "absolute" }}></div>
      <h3>Garage Name</h3>
    </Grid>;
  };

  render() {
    const { style } = this.props;

    return (
      <Grid
        spacing={24}
        style={{ ...style }}
        container
      >
        {this.renderItem()}
        {this.renderItem()}
        {this.renderItem()}
        {this.renderItem()}
        {this.renderItem()}
        {this.renderItem()}
        {this.renderItem()}
        {this.renderItem()}
      </Grid>
    );
  }
}
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

export default function GarageListItem({ garage, urlBase }) {

  const DIV_STYLE = {
    height: 150,
    width: "100%",
    margin: 10,
    position: "relative",
    backgroundImage: garage.images && `url(${Object.entries(garage.images)[0][1]})`,
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
  };

  return (
    <Grid item md={2} style={{ ...DIV_STYLE }} className="hoverable shadow">
      <Link to={urlBase + garage.uid}>
        <div className="image-overlay" />
        <div style={{ backgroundColor: "purple", height: 50, width: 50, top: 10, right: 10, position: "absolute" }}></div>
        <div style={{ position: "absolute", bottom: 5, left: 5 }}>
          <h3 style={{ color: "white", fontWeight: 400 }}>{garage.name}</h3>
          <h5 style={{ color: "white", marginTop: 6 }}>{garage.neighborhoods && garage.neighborhoods[0].name}</h5>
        </div>
      </Link>
    </Grid>
  );
}

GarageListItem.propTypes = {
  garage: PropTypes.object.isRequired,
};
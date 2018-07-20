import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { commaSeparatedString } from 'util/util';
import { text } from 'util/colors';
import { LocationPin } from 'util/Glyphs';

export default function GarageListItem({ garage, browser, distance, urlBase }) {

  const DIV_STYLE = {
    width: browser.greaterThan.small ? 300 : "100%",
    margin: 10,
    position: "relative",
  };

  const IMG_STYLE = {
    height: 100,
    width: "100%",
    backgroundImage: garage.images && `url(${Object.entries(garage.images)[0][1]})`,
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
  };

  return (
    <div style={{ ...DIV_STYLE }} className="hoverable shadow">
      <Link to={urlBase + garage.uid}>
        <div style={IMG_STYLE}>
        </div>
        <div style={{ height: 70, width: "100%", padding: 10, display: "flex" }}>
          <div>
            <h3 style={{ color: text.primary.dark, fontWeight: 500, marginBottom: 7 }}>{garage.name}</h3>
            <h5 style={{ color: text.secondary.dark, fontWeight: 400 }}>{commaSeparatedString(garage.locations, 'neighborhood')}</h5>
          </div>
          {distance && 
            <div style={{ display: "flex", position: "absolute", right: 10, bottom: 10 }}>
              <LocationPin style={{ height: 16, width: 11, marginRight: 4, fill: "rgba(0, 0, 0, 0.24)" }}/>
              <h5 style={{ color: "rgba(0, 0, 0, 0.24)", fontSize: "0.8em" }}>{distance} km</h5>
            </div>
          }
        </div>
      </Link>
    </div>
  );
}

GarageListItem.propTypes = {
  garage: PropTypes.object.isRequired,
};
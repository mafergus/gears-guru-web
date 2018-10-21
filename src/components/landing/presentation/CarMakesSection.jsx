import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import icons from 'util/car-icons';
import { text }  from 'util/colors';
import { Button } from 'gg-common';

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 80,
    paddingRight: 80,
    paddingTop: 60,
    paddingBottom: 50,
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: "1.6em",
    color: text.darkGray,
    marginBottom: 55,
  },
}

export default function CarMakesSection({ style, browser }) {

  const renderBox = icon => {
    return (
      <Grid 
        item
        xs={6}
        md={4}
        lg={2}
        style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 30 }}
      >
        <img src={icon} alt="Car make icon" />
      </Grid>
    );
  };

  const padding = 0;

  // Oof, we can't add breakpoints on Grid container. Should re-work this
  return (
    <div style={{ ...styles.container, ...style, paddingLeft: padding, paddingRight: padding }}>
      <h4 style={styles.title}>We service most makes and models</h4>
      <Grid container>
        <Grid
          item
          sm={12}
          md={10}
          lg={8}
          xl={6}
          style={{ margin: "auto" }}
        >
          <Grid container>
          {icons.map(icon => renderBox(icon))}
          </Grid>
        </Grid>
      </Grid>
      <Button style={{ marginTop: 70 }}>BOOK NOW</Button>
    </div>
  );
}

CarMakesSection.propTypes = {
  browser: PropTypes.object,
};

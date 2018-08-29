import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import icons from 'util/car-icons';
import { text, darkGray, gray }  from 'util/colors';

const styles = {
  container: {
    width: "100%",
    paddingLeft: 80,
    paddingRight: 80,
    paddingTop: 40,
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
        sm={6}
        md={4}
        lg={2}
        style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 30 }}
      >
        <img src={icon} />
      </Grid>
    );
  };

  const padding = browser.lessThan.small ? 20 : 80;

  return (
    <div style={{ ...styles.container, ...style, paddingLeft: padding, paddingRight: padding }}>
      <h4 style={styles.title}>We service most makes and models</h4>
      <Grid 
        container
      >
        {icons.map(icon => renderBox(icon))}
      </Grid>
    </div>
  );
}

CarMakesSection.propTypes = {
  browser: PropTypes.object,
};

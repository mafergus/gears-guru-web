import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import jumboImage from 'assets/hero.jpg';
import { Button } from 'gg-common';
import { DateSelect, TimeSelect } from 'components/ui/selects';
import { dividerColor } from 'util/colors';

const getStyles = browser => {

  const styles = {
    title: {
      fontSize: browser.lessThan.medium ? "1.8em" : "2.5em",
      textAlign: "center",
      color: "white",
      fontWeight: 400,
      marginLeft: 15,
      marginRight: 15,
    },
    subtitle: {
      color: "white",
      fontWeight: 400,
      marginTop: 25,
      marginBottom: 130,
    },
    heroContainer: { 
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 600,
      width: "100%",
    },
    heroImage: {
      width: "100%",
      height: 600,
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    heroImageOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    innerContainer: {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    dropDown: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "white",
      height: boxHeight,
      width: 225,
      paddingLeft: 12,
      paddingRight: 5,
      marginRight: browser.lessThan.large ? 0 : 7,
      marginBottom: browser.lessThan.large ? 10 : 0
    }
  };

  return styles;
};

const boxHeight = 45;

export default function JumboSection(props) {
  const {
    browser,
    handleChangeDate,
    handleChangeTime,
    onSubmit,
    style
  } = props;
  const styles = getStyles(browser);

  return (
    <div style={{ ...styles.heroContainer, ...style }}>
      <img src={jumboImage} style={styles.heroImage} alt="hero" />
      <div style={styles.heroImageOverlay}></div>
      <Grid style={styles.innerContainer} container>
        <h1 style={styles.title}>FIND THE BEST MECHANICS IN DUBAI</h1>
        <h3 style={styles.subtitle}>Fast. Verified. Best Price.</h3>
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <DateSelect
            width={300}
            onChange={handleChangeDate}
          />
          <TimeSelect
            style={{ borderLeft: `1px solid ${dividerColor}` }}
            width={300}
            onChange={handleChangeTime}
          />
          <Grid
            xs={10}
            md={2}
            item
          >
            <Button
              style={{ height: boxHeight, width: "100%" }}
              variant="square"
              onClick={onSubmit}
            >LET'S GO</Button>
          </Grid>
          
        </Grid>
      </Grid>
    </div>
  );
}

JumboSection.propTypes = {
  style: PropTypes.object,
  browser: PropTypes.object.isRequired,
  handleChangeDate: PropTypes.func.isRequired,
  handleChangeTime: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

JumboSection.defaultProps = {
  style: {},
};

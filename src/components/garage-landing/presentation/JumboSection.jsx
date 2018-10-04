import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import jumboImage from 'assets/garage-bg-small.jpg';
import Button from 'components/ui/Button';

const boxHeight = 45;

const getStyles = browser => {

  if (!browser) {
    browser = {
      lessThan: {
        medium: false,
        large: false,
      }
    };
  }

  const styles = {
    title: {
      fontSize: browser.lessThan.medium ? "1.8em" : "2.9em",
      textAlign: "center",
      color: "white",
      fontWeight: 400,
      marginLeft: 15,
      marginRight: 15,
    },
    subtitle: {
      color: "white",
      fontWeight: 400,
      marginTop: 45,
      marginBottom: 90,
      marginLeft: browser.lessThan.medium ? 20 : 0,
      marginRight: browser.lessThan.medium ? 20 : 0,
      textAlign: "center",
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
    },
    buttonStyle: {
      height: boxHeight,
      width: "100%",
      text: {
        fontSize: "1.1em",
      },
    },
  };

  return styles;
};

export default function JumboSection(props) {
  const { browser, onSignupClick, style } = props;
  const styles = getStyles(browser);

  return (
    <div style={{ ...styles.heroContainer, ...style }}>
      <img src={jumboImage} style={styles.heroImage} alt="hero" />
      <div style={styles.heroImageOverlay}></div>
      <Grid style={styles.innerContainer} container>
        <h1 style={styles.title}>Driving Your Business</h1>
        <h3 style={styles.subtitle}>Engage with your customers and attract new business</h3>
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <Grid
            xs={10}
            md={2}
            item
          >
            <Button
              style={styles.buttonStyle}
              textStyle={styles.buttonStyle.text}
              variant="square"
              onClick={onSignupClick}
            >GET STARTED</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

JumboSection.propTypes = {
  onSignupClick: PropTypes.func.isRequied,
};
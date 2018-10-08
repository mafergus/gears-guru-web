import React from 'react';
import Grid from '@material-ui/core/Grid';

import { text, darkGray, gray }  from 'util/colors';
import screenshot from 'assets/screenshot.png';
import { Button } from 'gg-common';

const TITLE = "Enjoy convenient car repair and maintenance at your home or office. It's as easy as 1-2-3."
const styles = {
  container: {
    width: "100%",
    padding: 20,
    paddingBottom: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFBFC",
  },
  title: {
    minWidth: 350,
    textAlign: "center",
    fontWeight: 500,
    fontSize: "1.6em",
    color: text.darkGray,
    marginTop: 50,
    marginBottom: 70,
  },
  image: {
    width: "50%",
    height: 400,
    objectFit: "contain",
  },
  section: {
    container: {
      display: "flex",
      marginTop: 35,
      marginBottom: 35,
    },
    title: {
      color: darkGray,
      fontWeight: 400,
      marginBottom: 10,
    },
    text: { 
      color: gray,
      fontWeight: 300,
    },
  }
};

export default function ScreenshotSection({ style, browser }) {

  const renderText = (index, title, text) => {
    return (
      <div style={styles.section.container}>
        <div className="number-circle">{index}</div>
        <div style={{ marginLeft: 25 }}>
          <h4 style={styles.section.title}>{title}</h4>
          <h4 style={styles.section.text}>{text}</h4>
        </div>
      </div>
    );
  };

  return (
    <Grid container style={{ ...styles.container, ...style }}>

      <h3 style={styles.title}>Life's too short to spend it at the repair shop</h3>

      <div style={{ display: "flex" }}>
        {browser.greaterThan.medium && <img style={styles.image} src={screenshot} alt="Screenshot" />}
        <Grid
          xs={12}
          xl={6}
          style={{ padding: 20 }}
          item
        >
          <h4 style={{ color: text.gray, fontWeight: 300 }}>{TITLE}</h4>
          <br />
          {renderText(1, "GET A QUOTE", "Tell us what your car needs or ask for a diagnostic. Receive a free, fast, fair & transparent price quote.")}
          {renderText(2, "BOOK APPOINTMENT", "Provide your home or office location. Tell us when to meet you there.")}
          {renderText(3, "GET YOUR CAR FIXED", "That’s it. No more waiting in repair shops - our mechanics come to you")}
        </Grid>
      </div>

      <Button variant="ios" style={{ marginTop: 10 }}>GET STARTED</Button>

    </Grid>
  );
}
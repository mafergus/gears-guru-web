import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import jumboImage from 'assets/hero.jpg';
import Button from 'components/ui/Button';

const styles = {
  title: {
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
};

export default function JumboSection({ style, browser, make, model, handleChange, onSubmit }) {

  const marginRight = browser.lessThan.large ? 0 : 7;
  const marginBottom = browser.lessThan.large ? 10 : 0;
  const titleSize = browser.lessThan.medium ? "1.8em" : "2.5em";

  return (
    <div style={{ ...styles.heroContainer, ...style }}>
      <img src={jumboImage} style={styles.heroImage}/>
      <div style={styles.heroImageOverlay}></div>
      <Grid style={styles.innerContainer} container>
        <h1 style={{ ...styles.title, fontSize: titleSize  }}>FIND THE BEST MECHANICS IN DUBAI</h1>
        <h3 style={styles.subtitle}>Fast. Verified. Best Price.</h3>
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          
          <Grid
            xs={10}
            md={3}
            item
            style={{ backgroundColor: "white", height: 50, width: 225, marginRight, marginBottom }}
          >
            <FormControl>
              <Select
                native
                value={make}
                onChange={handleChange("make")}
                inputProps={{
                  name: 'make',
                }}
              >
                <option value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid
            xs={10}
            md={3}
            item
            style={{ backgroundColor: "white", height: 50, width: 225, marginRight, marginBottom }}
          ></Grid>
          
          <Grid
            xs={10}
            md={3}
            item
          >
            <Button
              style={{ height: 50, width: "100%" }}
              variant="square"
            >FIND A TIME</Button>
          </Grid>
          
        </Grid>
      </Grid>
    </div>
  );
}
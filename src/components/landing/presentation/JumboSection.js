import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import jumboImage from 'assets/hero.jpg';
import Button from 'components/ui/Button';
import DateDropDown from 'components/landing/container/DateDropDown';
import TimeDropDown from 'components/landing/container/TimeDropDown';
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

export default function JumboSection({ style, browser, ...props }) {
  const {
    allMakes,
    models,
    selectedMake,
    selectedModel,
    handleChangeMake,
    handleChangeModel,
    onSubmit
  } = props;
  const styles = getStyles(browser);

  const DropDown = ({ style, allValues, selected, handleChange, placeholder, propName }) => {
    return (
      <Grid
        xs={10}
        md={2}
        item
        style={style}
      >
        <FormControl style={{ width: "100%" }}>
          <Select
            native
            disableUnderline
            value={selected}
            onChange={event => handleChange(event.target.value)}
            inputProps={{
              name: 'make',
            }}
          >
            <option value="" disabled>{placeholder}</option>
            {allValues.map(val => {
              return <option value={val.uid}>{val[propName]}</option>;
            })}
          </Select>
        </FormControl>
      </Grid>
    );
  }

  return (
    <div style={{ ...styles.heroContainer, ...style }}>
      <img src={jumboImage} style={styles.heroImage}/>
      <div style={styles.heroImageOverlay}></div>
      <Grid style={styles.innerContainer} container>
        <h1 style={styles.title}>FIND THE BEST MECHANICS IN DUBAI</h1>
        <h3 style={styles.subtitle}>Fast. Verified. Best Price.</h3>
        <Grid container style={{ display: "flex", justifyContent: "center" }}>

          <DateDropDown width={400} />

          <TimeDropDown style={{ borderLeft: `1px solid ${dividerColor}` }} width={400} />
          
          {/*<DropDown
            allValues={models}
            selected={selectedModel}
            handleChange={handleChangeModel}
            propName="name"
            placeholder="Car Model"
            style={styles.dropDown}
          />*/}
          
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
  allMakes: PropTypes.array.isRequired,
  modes: PropTypes.array.isRequired,
  browser: PropTypes.object.isRequired,
  selectedMake: PropTypes.string.isRequired,
  selectedModel: PropTypes.string.isRequired,
  handleChangeMake: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

JumboSection.defaultProps = {
  style: {},
};

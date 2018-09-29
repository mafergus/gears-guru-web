import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardArrowDown } from '@material-ui/icons';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { text } from 'util/colors';

const getStyles = width => {
  const borderRadius = 4;
  const style = {
    container: {
      height: 45,
      width: width,
      position: "relative",
      backgroundColor: "white",
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
    },
    topContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      paddingLeft: 11,
      paddingRight: 6,
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    innerContainer: {
      width: "100%",
      height: "100%",
      paddingTop: 10,
      paddingBottom: 10,
      position: "relative",
    },
    icon: {
      height: 17,
      width: 17,
      display: "flex",
      alignItems: "center",
      position: "absolute",
      left: 0,
    },
    iconContainer: {
      height: 25,
      position: "absolute",
      left: 0,
      display: "flex",
      alignItems: "center",
    },
    chevron: {
      position: "absolute",
      right: 0,
      fill: text.secondary.dark,
    },
    text: {
      fontSize: "1em",
    },
    child: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  };
  return style;
}

export default function DateTimeSelect({ children, style, width, browser, icon }) {

  const styles = getStyles(width);
  const Icon = icon;
  const childProps = {
    style: styles.child,
    textFieldStyle: {
      width: "calc(100% - 38px)",
      marginLeft: 38,
    }
  };
  const theChildren = children && React.Children.map(children, child => React.cloneElement(child, childProps));

  // We can't pass clicks to DatePicker so we gotta do some gynmastics to make this layout
  return (
    <MuiThemeProvider>
      <div
        style={{ ...styles.container, ...style }}
      >
        <div style={styles.topContainer}>
          <div style={styles.innerContainer}>
            <div style={styles.iconContainer}>
              <Icon style={styles.icon}/>
            </div>
            <KeyboardArrowDown style={styles.chevron}/>
          </div>
        </div>
        {theChildren}
      </div>
    </MuiThemeProvider>
  )
}

DateTimeSelect.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  width: PropTypes.number,
  browser: PropTypes.object,
  icon: PropTypes.string,
};

DateTimeSelect.defaultProps = {
  children: null,
  style: {},
  width: 150,
  browser: {},
  icon: "",
};
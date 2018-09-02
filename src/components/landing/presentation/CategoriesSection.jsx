import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import { text, darkGray, gray, dividerColor }  from 'util/colors';

const borderRadius = "3px";

const getStyle = browser => {
  const STYLES = {
    spacing: browser.lessThan.medium ? 16 : 32,
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      paddingTop: 60,
      paddingBottom: 50,
    },
    title: {
      textAlign: "center",
      fontWeight: 500,
      color: text.darkGray,
      marginBottom: 55,
    },
    item: {
      width: "100%",
      backgroundColor: "white",
      borderWidth: 1,
      border: `1px solid ${dividerColor}`,
      borderRadius,
      
      textContainer: {
        height: browser.lessThan.medium ? 40 : 50,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },

      title: {
        color: text.primary.dark,
        fontWeight: 300,
      },

      image: {
        width: "100%",
        height: browser.lessThan.medium ? 100 : 200,
        objectFit: "cover",
        borderRadius: `${borderRadius} ${borderRadius} 0px 0px`,
      },
    },
  }

  return STYLES;
}

const getPaddingHorizontal = browser => {
  return browser.lessThan.small ? 30 : 80;
}

export default function CategoriesSection({ style, browser, categories }) {
  const top = categories.slice(0, 4);

  const renderItem = (category, style) => {
    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        lg={2}
      >
        <div style={style} className="light-shadow hoverable">
          <img src={category.image} style={style.image}/>
          <div style={style.textContainer}>
            <h4 style={style.title}>{category.name}</h4>
          </div>
        </div>
      </Grid>
    );
  };
  
  const defaultStyle = getStyle(browser);

  return (
    <div
      style={{ 
        ...defaultStyle.container,
        paddingLeft: getPaddingHorizontal(browser),
        paddingRight: getPaddingHorizontal(browser),
        ...style
      }}
    >
      <h2 style={defaultStyle.title}>Popular Categories</h2>
      <Grid
        container
        spacing={defaultStyle.spacing}
        style={{ display: "flex", justifyContent: "center" }}
      >
        {top.map(category => renderItem(category, defaultStyle.item))}
      </Grid>
    </div>
  );
}

CategoriesSection.propTypes = {
  categories: PropTypes.array.isRequired,
  style: PropTypes.object,
};

CategoriesSection.defaultProps = {
  style: {},
};
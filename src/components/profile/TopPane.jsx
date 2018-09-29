import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Today from '@material-ui/icons/Today';
import MonetizationOn from '@material-ui/icons/MonetizationOn';

import HorizontalSlider from 'components/profile/horizontal-slider/HorizontalSlider';
import { textDark } from 'util/colors';

export default class TopPane extends React.Component {

  static propTypes = {
    browser: PropTypes.object.isRequired,
    garage: PropTypes.object.isRequired,
  };

  renderTitleDiv() {
    const { browser, garage } = this.props;
    const neighborhoods = garage.locations.map(item => item.neighborhood);

    return (
      <div style={{ height: "100%", width: "100%", padding: 20, position: "relative" }}>
        <img 
          src={garage.icon}
          style={{ 
            height: 100,
            width: 100,
            display: "inline-block",
            marginRight: 15,
            objectFit: "contain",
          }}
          className="border"
          alt="Garage Icon"
        />
        <div 
          style={{ 
            height: 100,
            width: 200,
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <h1 style={{ position: "absolute", top: 5, left: 5  }}>{garage.name}</h1>
          <h5 style={{ color: textDark.secondary, position: "absolute", bottom: 5, left: 5 }}>Neighborhoods: {neighborhoods}</h5>
        </div>
        <div 
          style={{ 
            position: browser.greaterThan.small ? "absolute" : "inherit",
            right: browser.greaterThan.small ? 20 : 0,
            bottom: browser.greaterThan.small ? 20 : 0,
            marginTop: browser.greaterThan.small ? 0 : 13,
          }}
        >
          {/*<div style={{ padding: 7, paddingRight: 0, textAlign: "right" }}>
            <span style={{ 
              color: "white",
              backgroundColor: "green",
              padding: 7,
              borderRadius: 3,
            }}>{garage.rating}<span style={{ fontSize: "0.6em" }}>/10</span></span>
          </div>*/}
          <Button
            style={{ 
              height: 30,
              width: browser.greaterThan.small ? "inherit" : "calc((100% - 7px) / 2)",
              marginRight: 7,
            }}
            variant="raised"
            onClick={() => alert("Book!")}
            color="secondary"
          >
            <Today style={{ marginRight: 6, height: 22, width: 22 }} />
            Book
          </Button>
          <Button 
            style={{ 
              height: 30,
              width: browser.greaterThan.small ? "inherit" : "calc((100% - 7px) / 2)",
            }}
            variant="raised"
            onClick={() => alert("Book!")}
            color="secondary"
          >
            <MonetizationOn style={{ marginRight: 6, height: 22, width: 22 }} />
            Quote
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { browser, garage } = this.props;

    if (!Object.keys(garage).length) {
      return null;
    }

    const data = garage && garage.images && Object.entries(garage.images).map(entry => { 
      return { uid: entry[0], url: entry[1] };
    });

    return (
      <div 
        style={{ width: "100%", marginBottom: 7, position: "relative", backgroundColor: "white" }}
        className="border"
      >
        <HorizontalSlider browser={browser} data={data} />
        <hr />
        {this.renderTitleDiv()}
      </div>
    );
  }
}
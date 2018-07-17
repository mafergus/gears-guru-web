import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Today from '@material-ui/icons/Today';
import MonetizationOn from '@material-ui/icons/MonetizationOn';

import HorizontalSlider from 'components/profile/horizontal-slider/HorizontalSlider';
import { textDark } from 'util/colors';

const commaSeparatedString = (objArr, propName) => {
  return objArr ? objArr.reduce((acc, curr, idx, array) => acc + curr[propName] + (idx !== array.length-1 ? ", " : ""), '') : '';
}

export default class TopPane extends React.Component {

  static propTypes = {
    garage: PropTypes.object.isRequired,
  };

  renderTitleDiv() {
    const { garage } = this.props;
    const types = commaSeparatedString(garage.garageTypes, 'type');
    const neighborhoods = garage.locations.map(item => item.neighborhood);

    return (
      <div style={{ padding: 20, width: "100%", display: "flex" }}>
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
        <div style={{ display: "inline-block", flexGrow: 1 }}>
          <div style={{ height: "100%", display: "flex", flexDirection: "column", paddingTop: 5, paddingBottom: 5 }}>
            <h1 style={{ flexGrow: 1 }}>{garage.name}</h1>
            <h5 style={{ color: textDark.secondary }}>{types}</h5>
            <h5 style={{ color: textDark.secondary, marginTop: 6 }}>Neighborhoods: {neighborhoods}</h5>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ padding: 7, paddingRight: 0, textAlign: "right" }}>
            <span style={{ 
              color: "white",
              backgroundColor: "green",
              padding: 7,
              borderRadius: 3,
            }}>{garage.rating}<span style={{ fontSize: "0.6em" }}>/10</span></span>
          </div>
          <div style={{ display: "flex", flexGrow: 1, alignItems: "flex-end" }}>
            <Button
              style={{ height: 30, marginRight: 7 }}
              variant="raised"
              onClick={() => alert("Book!")}
              color="secondary"
            >
              <Today style={{ marginRight: 6, height: 22, width: 22 }} />
              Book
            </Button>
            <Button 
              style={{ height: 30 }}
              variant="raised"
              onClick={() => alert("Book!")}
              color="secondary"
            >
              <MonetizationOn style={{ marginRight: 6, height: 22, width: 22 }} />
              Quote
            </Button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { garage } = this.props;

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
        <HorizontalSlider data={data} />
        <hr />
        {this.renderTitleDiv()}
      </div>
    );
  }
}
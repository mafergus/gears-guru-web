import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Today from '@material-ui/icons/Today';
import MonetizationOn from '@material-ui/icons/MonetizationOn';

import HorizontalSlider from 'components/profile/horizontal-slider/HorizontalSlider';
import { textDark } from 'util/colors';

const commaSeparatedString = (objArr, propName) => {
  return objArr ? objArr.reduce((acc, curr, idx, array) => acc + curr[propName] + (idx != array.length-1 ? ", " : ""), '') : '';
}

export default class TopPane extends React.Component {

  static propTypes = {
    garage: PropTypes.object.isRequired,
  };

  static defaultProps = {
    garage: {
      name: 'Placeholder',
      images: [],
      rating: 5,
      garageTypes: [],
      neighborhoods: [],
    }
  };

  constructor(props) {
    super(props);
  }

  renderTitleDiv() {
    const { garage } = this.props;
    const types = commaSeparatedString(garage.garageTypes, 'type');
    const neighborhoods = commaSeparatedString(garage.neighborhoods, 'name');

    return (
      <div style={{ padding: 20, width: "100%", display: "flex" }}>
        <img 
          src={garage.icon}
          style={{ 
            height: 100,
            width: 100,
            display: "inline-block",
            marginRight: 15,
          }}
          className="border"
        />
        <div style={{ display: "inline-block", flexGrow: 1 }}>
          <div style={{ height: "100%", display: "flex", flexDirection: "column", paddingTop: 5, paddingBottom: 5 }}>
            <h1 style={{ flexGrow: 1 }}>{garage.name}</h1>
            <h5 style={{ color: textDark.secondary }}>{types}</h5>
            <h5 style={{ color: textDark.secondary, marginTop: 6 }}>{neighborhoods}</h5>
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
    
    const data = [
      "https://igx.4sqi.net/img/general/200x200/49627524_V5mhAMpdiNL7j9la_FaH0vseHdn3cAfSc8yYfEqaDl4.jpg",
      "https://igx.4sqi.net/img/general/200x200/51224990_Q3UVdm5pP5xIc1TAhKGoc9BUv2lw7efAaJrDSsDd7sw.jpg",
      "https://igx.4sqi.net/img/general/200x200/51224990_ib_rLnO3EVZa5V_x2ds_sLTew0SBS0ylo5SlglRfAcA.jpg",
      "http://placehold.it/1000x400/ffffff/c0392b/&text=slide1",
      "https://igx.4sqi.net/img/general/200x200/43206255_DK4sclHoKq3iR1j-22ZKm6QGjYptf0HR_6bOzjMgRug.jpg",
      "http://placehold.it/1000x400/ffffff/c0392b/&text=slide1",
      "https://igx.4sqi.net/img/general/200x200/32683196__X0uPLoWQYFokNjmL7aKlrObsl5Xqe17wyegFmMDW5Q.jpg",
      "https://igx.4sqi.net/img/general/200x200/32683196_niismZRK0CyDSgI5eDqRV2uLt5GtQ-qKdamKPL3DSlM.jpg",
      "https://igx.4sqi.net/img/general/200x200/32683196_1ibw-E6xJNRpOb-OHTtixgxm8Hm4gwXhxra8BfnpHbQ.jpg",
      "http://placehold.it/1000x400/ffffff/c0392b/&text=slide1",
      "https://igx.4sqi.net/img/general/200x200/32683196_iGsHGE1XdD6xxyAAgCi6XJLj1bvI5A4HznZT7Cyfl8g.jpg",
      "https://igx.4sqi.net/img/general/200x200/32683196_iGsHGE1XdD6xxyAAgCi6XJLj1bvI5A4HznZT7Cyfl8g.jpg",
    ];

    if (!Object.keys(garage).length) {
      return null;
    }

    return (
      <div 
        style={{ width: "100%", marginBottom: 15, position: "relative", backgroundColor: "white" }}
        className="border"
      >
        <HorizontalSlider data={garage.images}/>
        <hr />
        {this.renderTitleDiv()}
      </div>
    );
  }
}
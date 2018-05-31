import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import HorizontalSlider from 'components/profile/horizontal-slider/HorizontalSlider';

const commaSeparatedString = (objArr, propName) => {
  return objArr.reduce((acc, curr, idx, array) => acc + curr[propName] + (idx != array.length-1 ? "," : ""), '');
}

export default class TopPane extends React.Component {

  static propTypes = {
    garage: PropTypes.object.isRequired,
  };

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
          }}
          className="border"
        />
        <div style={{ display: "inline-block", flexGrow: 1 }}>
          <h1>{garage.name}</h1>
          <h3>{types}</h3>
          <h5>{neighborhoods}</h5>
        </div>
        <div style={{ backgroundColor: "purple" }}>
          <h3>{garage.rating}</h3>
          <div style={{ display: "flex" }}>
            <Button variant="raised" onClick={() => alert("Book!")} color="secondary">Book</Button>
            <Button variant="raised" onClick={() => alert("Book!")} color="secondary">Quote</Button>
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

    if (!garage) {
      return null;
    }

    return (
      <div style={{ width: "100%", height: 400, position: "relative" }}>
        <HorizontalSlider data={garage.images}/>
        <hr />
        {this.renderTitleDiv()}
      </div>
    );
  }
}
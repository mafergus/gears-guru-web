import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LocationOn from '@material-ui/icons/LocationOn';
import Schedule from '@material-ui/icons/Schedule';
import Phone from '@material-ui/icons/Phone';
import Web from '@material-ui/icons/Web';
import Face from '@material-ui/icons/Face';

import SimpleMap from 'components/map/SimpleMap';
import MapMarker from 'components/map/MapMarker';
import Hours from 'components/profile/Hours';
import { AL_QUOZ_LOCATION } from 'util/constants';
import { textDark } from 'util/colors';

export default class LocationPane extends React.Component {

  static propTypes = {
    className: PropTypes.any,
    garage: PropTypes.object.isRequired,
    onLocationClick: PropTypes.func,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    onLocationClick: () => {},
    style: {},
  };

  renderAddress = () => {
    const { garage } = this.props;

    return (
      <div style={{ marginTop: 6 }}>
        <h4 style={{ marginBottom: 10, color: textDark.secondary }}>{garage.name}</h4>
        <p style={{ marginBottom: 10, color: textDark.secondary }}>{garage.locations && garage.locations[0].address}</p>
        <a
          href="http://maps.google.com/maps?daddr=25.117632,55.212545"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "0.9em" }}
        >Get directions</a>
      </div>
    );
  };

  renderItem = (icon, item) => {
    return (
      <div style={{ display: "flex", alignItems: "center", padding: 10, }}>
        {React.cloneElement(icon, { style: { marginRight: 23, color: textDark.secondary } })}
        {item}
      </div>
    );
  };

  renderHours = () => {
    return <Hours hours={this.props.garage.hours}/>
  };

  renderPhone = () => {
    return (
      <div>
        <a href="tel:+1-800-555-5555" style={{ color: textDark.secondary }}>Call 1-800-555-5555</a>
        {/*<p style={{ color: textDark.secondary }}>{garage.phoneNumber}</p>*/}
      </div>
    );
  };

  renderWebsite = () => {
    const { garage } = this.props;
    return (
      <p style={{ color: textDark.secondary }}>
        <a
          href={garage.website}
          target="_blank"
        >
          {garage.website}
        </a>
      </p>
    );
  };

  renderEmail = () => {
    const { garage } = this.props;
    return (
      <p style={{ color: textDark.secondary }}>
        <a
          href={garage.website}
          target="_blank"
        >
          info@garage.com
        </a>
      </p>
    );
  };

  renderFacebook = () => {
    const { garage } = this.props;
    return (
      <p style={{ color: textDark.secondary }}>
        <a
          href={`https://www.facebook.com/${garage.facebook}`}
          target="_blank"
        >
          {garage.facebook}
        </a>
      </p>
    );
  };

  render() {
    const { className, garage, style } = this.props;
    if (!garage) { return null; }
    const locations = garage.locations;
    const mapCenter = (locations && locations.length > 0) 
      ? { lat: parseFloat(locations[0].lat), lng: parseFloat(locations[0].long) } 
      : { lat: AL_QUOZ_LOCATION[0], lng: AL_QUOZ_LOCATION[1] };

    return (
      <div className={classNames(className, 'border')} style={{ ...style, padding: 7 }}>
        {locations && 
          <SimpleMap center={mapCenter} style={{ width: "100%", height: 250 }}>
            {locations.map(item => <MapMarker key={item.lat + item.long} lat={parseFloat(item.lat)} lng={parseFloat(item.long)}/>)}
          </SimpleMap>
        }
        {this.renderItem(<LocationOn />, this.renderAddress())}
        <hr />
        {this.renderItem(<Schedule />, this.renderHours())}
        <hr />
        {this.renderItem(<Phone />, this.renderPhone())}
        <hr />
        {this.renderItem(<Web />, this.renderWebsite())}
        <hr />
        {this.renderItem(<Web />, this.renderEmail())}
        <hr />
        {this.renderItem(<Face />, this.renderFacebook())}
        <hr />
      </div>
    );
  }
}
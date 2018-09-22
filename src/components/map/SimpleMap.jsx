import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_MAPS_API_KEY, DEFAULT_LOCATION } from 'util/constants';
// import MapCard from 'components/Map/MapCard';

export default class SimpleMap extends Component {

  static propTypes = {
    center: PropTypes.object,
    children: PropTypes.node,
    options: PropTypes.object,
    style: PropTypes.object,
    zoom: PropTypes.number,
  };
  
  static defaultProps = {
    center: {},
    children: null,
    options: {},
    style: {},
    zoom: 12,
  };

  constructor() {
    super();
    autoBind(this);

    this.state = {
      hoveredMarker: -1,
    };
  }

  onMarkerEnter(event) {
    this.setState({ hoveredMarker: event });
  }

  onMarkerExit() {
    this.setState({ hoveredMarker: -1 });
  }

  render() {
    const { center, children, style, zoom } = this.props;

    return (
      <div style={{ height: "100%", ...style }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: [GOOGLE_MAPS_API_KEY] }}
          center={center}
          defaultCenter={DEFAULT_LOCATION}
          defaultZoom={zoom}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
          options={{ scrollwheel: false }}
        >
          {/*markers*/}
          {children}
        </GoogleMapReact>
      </div>
    );
  }
}
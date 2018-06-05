import React from "react";
import PropTypes from 'prop-types';
import autoBind from "react-autobind";
import LocationOn from '@material-ui/icons/LocationOn';

import { secondary } from 'util/colors';
// import { Place } from "components/Icons/Glyphs";

const HEIGHT = 90;
const WIDTH = 63;

const STYLE = {
  fill: secondary[500],
  position: 'absolute',
  width: WIDTH,
  height: HEIGHT,
  left: -WIDTH / 2,
  top: -HEIGHT,
};

export default class MapMarker extends React.Component {

  static propTypes = {
    hovered: PropTypes.bool.isRequired,
    onClickMarker: PropTypes.func,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    // onMouseOver: PropTypes.func.isRequired,
    // onMouseExit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onClickMarker: null,
  };

  constructor() {
    super();
    autoBind(this);

    this.state = { isHovered: false };
  }


  onMouseEnter() {
    // const { event, onMouseOver } = this.props;
    // this.setState({ isHovered: true });
    // onMouseOver(event);
  }

  onMouseExit() {
    // const { event, onMouseExit } = this.props;
    // this.setState({ isHovered: false });
    // onMouseExit(event);
  }

  onMarkerClick() { // For overlapping (not-clickable) markers
    // const { event, onClickMarker } = this.props;
    // onClickMarker(event);
  }

  getStyle(scale) {
    return { ...STYLE, top: -HEIGHT*scale };
  }

  render() {
    const { lat, lng } = this.props;
    const scale = this.props.hovered ? 1 : 0.65;

    return <LocationOn
        style={{ ...this.getStyle(scale), transform: `scale(${scale} , ${scale})`, WebkitTransform: `scale(${scale} , ${scale})` }}
        lat={lat}
        lng={lng}
        onMouseOver={this.onMouseEnter}
        onMouseOut={this.onMouseExit}
        color="#EEEEEE" 
      />;
  }
}
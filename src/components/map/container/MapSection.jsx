import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Presentation from 'components/map/presentation/MapSection';

function mapStateToProps(state, props) {
  const locations = Object.entries(state.garages)
    .forEach(entry => ({ ...entry[1].geometry.location, uid: entry[0] }));

  return {
    locations: locations || [],
  };
}

class MapSection extends React.Component {

  static propTypes = {
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {}
  };
  
  render() {
    const { locations, style } = this.props;

    return (
      <Presentation locations={locations} style={style} />
    );
  }
}

export default connect(mapStateToProps)(MapSection);
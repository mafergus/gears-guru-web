import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Presentation from 'components/landing/presentation/MapSection';

function mapStateToProps(state, props) {
  const locations = [];
  Object.entries(state.garages).forEach(entry => {
    entry[1].locations.map(item => locations.push(item));
  });

  return {
    locations,
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
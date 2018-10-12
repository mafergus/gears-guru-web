import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import GarageListView from 'components/garage-list/GarageListView';

const mapStateToProps = (state, props) => {
  return {
    browser: state.browser,
    garages: Object.entries(state.garages).map(entry => entry[1]),
  };
}

class GarageList extends React.Component {

  static propTypes = {
    currentLocation: PropTypes.object.isRequired,
    onItemClick: PropTypes.object,
  };

  static defaultProps = {
    onItemClick: () => {},
  };

  render() {
    const { browser, currentLocation, garages, onItemClick } = this.props;

    return (
      <GarageListView
        browser={browser}
        currentLocation={currentLocation}
        garages={garages}
        onItemClick={onItemClick}
      />
    );
  }
}

export default withRouter(connect(mapStateToProps)(GarageList));
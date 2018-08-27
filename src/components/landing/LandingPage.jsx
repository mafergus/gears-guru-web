import React from 'react';
import { connect } from 'react-redux';

import { darkWhite } from 'util/colors';
import JumboSection from 'components/landing/JumboSection';
import BoxesSection from 'components/landing/BoxesSection';
import ScreenshotSection from 'components/landing/ScreenshotSection';
import CarMakesSection from 'components/landing/CarMakesSection';

const styles = {
  container: {
    width: "100%",
    height: 4000,
    zIndex: -1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "purple",
  },
};

function mapStateToProps(state, props) {
  return {
    browser: state.browser,
  };
}

class LandingPage extends React.Component {

  render() {
    const { browser } = this.props;

    return (
      <div style={styles.container}>
      <JumboSection />
        <BoxesSection />
        <ScreenshotSection style={{ backgroundColor: darkWhite }} browser={browser} />
        <CarMakesSection browser={browser} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(LandingPage);

import React from 'react';
import { connect } from 'react-redux';

import { darkWhite } from 'util/colors';
import JumboSection from 'components/landing/container/JumboSection';
import BoxesSection from 'components/landing/BoxesSection';
import ScreenshotSection from 'components/landing/ScreenshotSection';
import CarMakesSection from 'components/landing/CarMakesSection';
import Footer from 'components/Footer';
import { allWithBrowser, withBrowser } from 'util/withBrowser';

const styles = {
  container: {
    width: "100%",
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
        <JumboSection browser={browser} />
        <BoxesSection />
        <ScreenshotSection style={{ backgroundColor: darkWhite }} browser={browser} />
        <CarMakesSection browser={browser} />
        <Footer browser={browser}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LandingPage);

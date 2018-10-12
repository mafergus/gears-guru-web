import React from 'react';
import { connect } from 'react-redux';

import { darkWhite } from 'util/colors';
import JumboSection from 'components/landing/container/JumboSection';
import BoxesSection from 'components/landing/presentation/BoxesSection';
import ScreenshotSection from 'components/landing/presentation/ScreenshotSection';
import CarMakesSection from 'components/landing/presentation/CarMakesSection';
import MapSection from 'components/map/container/MapSection';
import CategoriesSection from 'components/landing/container/CategoriesSection';

const styles = {
  container: {
    width: "100%",
    zIndex: -1,
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
        <JumboSection
          browser={browser}
        />
        <BoxesSection />
        <ScreenshotSection
          style={{ backgroundColor: darkWhite }}
          browser={browser}
        />
        <MapSection
          style={{ backgroundColor: "white" }}
        />
        <CategoriesSection
          browser={browser}
          style={{ backgroundColor: darkWhite }}
        />
        <CarMakesSection
          browser={browser}
          style={{ backgroundColor: "white" }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(LandingPage);

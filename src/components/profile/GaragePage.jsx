import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TopPane from 'components/profile/TopPane';
import ServicesPane from 'components/profile/ServicesPane';
import LocationPane from 'components/profile/LocationPane';
import ReviewsPane from 'components/profile/ReviewsPane';
import Grid from '@material-ui/core/Grid';
import 'static/index.scss';

function mapStateToProps(state, props) {
  const id = props.match.params.id || null;
  return {
    browser: state.browser,
    garage: id ? { ...state.garages[id], uid: id } : {},
  };
}

class GaragePage extends React.Component {

  static propTypes = {
    browser: PropTypes.object.isRequired,
    garage: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };
  
  locationClick = locationObj => {

  };

  render() {
    const { browser, garage } = this.props;

    if (!garage) { return null; }
    
    return (
      <Grid container style={{ width: "100%", marginTop: 12 }} className="centered-container">
        <Grid item sm={12} lg={9}>
          <TopPane garage={garage}/>
          <div style={{ display: "flex", width: "100%", flexDirection: browser.lessThan.medium ? "column" : "row" }}>
            <Grid item sm={12} lg={9}>
              <ServicesPane 
                style={{ height: 250 }}
                garage={garage}
              />
              <div style={{ height: 7 }} />
              <ReviewsPane garageId={garage.uid}/>
            </Grid>
            <div style={{ width: 12 }} />
            <LocationPane
              style={{ width: "30%", backgroundColor: "white" }}
              garage={garage}
              onLocationClick={this.locationClick}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(GaragePage);
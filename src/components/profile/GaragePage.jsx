import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TopPane from 'components/profile/TopPane';
import ServicesPane from 'components/profile/ServicesPane';
import LocationPane from 'components/profile/LocationPane';
// import FeedContainer from 'components/feed/FeedContainer';
import 'static/index.scss';

function mapStateToProps(state, props) {
  const id = props.match.params.id || null;
  return {
    garage: id ? { ...state.garages[id], uid: id } : {},
  };
}

class GaragePage extends React.Component {

  static propTypes = {
    garage: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };
  
  locationClick = locationObj => {

  };

  render() {
    const { garage } = this.props;
    
    return (
      <div style={{ width: "100%", marginTop: 12 }} className="centered-container">
        <div style={{ width: "70%" }}>
          <TopPane garage={garage}/>
          <div style={{ display: "flex" }}>
            <ServicesPane 
              style={{ height: 250 }}
              garage={garage}
            />
            {/*<FeedContainer />*/}
            <div style={{ width: 12 }} />
            <LocationPane
              style={{ width: "30%", backgroundColor: "white" }}
              garage={garage}
              onLocationClick={this.locationClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GaragePage);
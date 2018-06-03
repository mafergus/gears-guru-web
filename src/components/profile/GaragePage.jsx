import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TopPane from 'components/profile/TopPane';
import ServicesPane from 'components/profile/ServicesPane';
import LocationPane from 'components/profile/LocationPane';
import 'static/index.scss';

const garageId = 'garageId1';

function mapStateToProps(state, props) {
  const id = props.match.params.id || null;
  return {
    garage: id ? state.garages[id] : {},
  };
}

class GaragePage extends React.Component {

  static propTypes = {
    garage: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };
  
  constructor(props) {
    super(props);
  }

  render() {
    const { garage, match } = this.props;
    const { id } = match.params.id;
    
    return (
      <div style={{ height: "100%", width: "100%", marginTop: 12 }} className="centered-container">
        <div 
          style={{ 
            height: "100%",
            width: "70%",
          }}
        >
          <TopPane garage={garage}/>
          <div style={{ display: "flex" }}>
            <ServicesPane style={{ height: 300 }}/>
            <div style={{ width: 12 }} />
            <LocationPane style={{ width: "30%", backgroundColor: "orange" }}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GaragePage);
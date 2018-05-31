import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TopPane from 'components/profile/TopPane';
import ServicesPane from 'components/profile/ServicesPane';
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
        <div style={{ 
            height: "100%",
            width: "70%",
            backgroundColor: "white",
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: 3,
          }}
        >
          <TopPane garage={garage} />
          <hr />
          <ServicesPane style={{ width: "100%", height: 300, backgroundColor: "blue" }}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GaragePage);
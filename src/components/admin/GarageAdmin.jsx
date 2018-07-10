import React from 'react';
import PropTypes from 'prop-types';

export default class GarageAdmin extends React.Component {
  
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  render() {
    const { match } = this.props;

    return (
      <div style={{ width: "100%", height: 500, backgroundColor: "purple" }}>
      </div>
    );
  }
}
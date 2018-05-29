import React from 'react';
import PropTypes from 'prop-types';

import TopPane from 'components/profile/TopPane';
import 'static/index.scss';

export default class ProfilePage extends React.Component {
  
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{ height: "100%", width: "100%" }} className="centered-container">
        <div style={{ height: "100%", width: "80%", backgroundColor: "green" }}>
        </div>
      </div>
    );
  }
}
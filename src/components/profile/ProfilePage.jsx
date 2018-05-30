import React from 'react';
import PropTypes from 'prop-types';

import TopPane from 'components/profile/TopPane';
import ServicesPane from 'components/profile/ServicesPane';
import 'static/index.scss';

const garage = {
  name: "Gears Guru Garage",
  neighborhoods: ['Al Quoz'],
  garageTypes: ['Car Garage', 'Luxury Cars'],
  rating: 8.79,
  icon: "http://placehold.it/1000x400/ffffff/c0392b/&text=GGG"
}

export default class ProfilePage extends React.Component {
  
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{ height: "100%", width: "100%" }} className="centered-container">
        <div style={{ height: "100%", width: "80%", backgroundColor: "green" }}>
          <TopPane />
          <ServicesPane style={{ width: "100%", height: 300, backgroundColor: "blue" }}/>
        </div>
      </div>
    );
  }
}
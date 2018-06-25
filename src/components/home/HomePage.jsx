import React from 'react';

import SimpleMap from 'components/map/SimpleMap';
import GarageList from 'components/home/GarageList';

export default class HomePage extends React.Component {
  render() {
    return (
      <div style={{ height: "100%", width: "100%", backgroundColor: "red" }}>
        <SimpleMap style={{ width: "100%", height: 300, backgroundColor: "blue" }} />
        <GarageList />
      </div>
    );
  }
}
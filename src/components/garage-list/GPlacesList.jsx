import React from 'react';
import loadjs from 'loadjs';

import { AL_QUOZ_LOCATION } from 'util/constants';

const ListItem = ({ style, name, image }) => {
  return (
    <div style={{ height: 150, width: 650, display: "flex" }}>
      <img style={{ height: 128, width: 128, objectFit: "cover", marginRight: 15 }} src={image} />
      <div>
        <h2>{name}</h2>
      </div>
    </div>
  );
}

const key = "AIzaSyDsjdI2R4TNd9bpKcHtVMI6qthrV44C8IY";
const fields = [
  'photos',
  'formatted_address',
  'name',
  'rating',
  'opening_hours',
  'geometry',
  'address_component',
  'place_id',
  'url',
  'vicinity',
  'formatted_phone_number',
  'opening_hours',
  'website',
  'price_level',
  'rating',
  'reviews',
  'international_phone_number'
];

export default class GPlacesList extends React.Component {

  state = {
    places: [],
  };

  componentDidMount() {
    loadjs(`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`, this.initMap);
  }

  initMap = () => {
    if (typeof google === "undefined") { return; }

    var mapCenter = new google.maps.LatLng(AL_QUOZ_LOCATION[0], AL_QUOZ_LOCATION[1]); //eslint-disable-line

    const map = new google.maps.Map(document.getElementById('map'), { //eslint-disable-line
      center: mapCenter,
      zoom: 12
    });

    var request = {
      fields,
      location: { lat: AL_QUOZ_LOCATION[0], lng: AL_QUOZ_LOCATION[1] },
      radius: 10000,
      type: 'car_repair',
    };

    const service = new google.maps.places.PlacesService(map); //eslint-disable-line
    service.nearbySearch(request, this.callback);
  }

  callback = (results, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) { //eslint-disable-line
      this.setState({ places: results });
    }
  }

  render() {
    const { places } = this.state;

    return (
      <div style={{ height: "100%", width: "100%", backgroundColor: "orange" }}>
        <div style={{ display: "none" }} id="map" />
        {places.map(garage => {
          const imgSrc = garage.hasOwnProperty("photos") ? garage.photos[0].getUrl() : 'https://via.placeholder.com/150x150';
          return (
            <ListItem
              name={garage.name}
              image={imgSrc}
            />
          );
        })}
      </div>
    )
  }
}
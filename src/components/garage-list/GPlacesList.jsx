import React from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';

import { AL_QUOZ_LOCATION } from 'util/constants';
import { dividerColor } from 'util/colors';
import { LocationPin } from 'util/Glyphs';

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

const KEY = 'AIzaSyDsjdI2R4TNd9bpKcHtVMI6qthrV44C8IY';
const URL = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400';

const getPhoto = (garage) => garage.hasOwnProperty('photos') ? 
    `${URL}&photoreference=${garage.photos[0].photo_reference}&key=${KEY}` :
    'https://via.placeholder.com/150x150';

const ListItem = ({ style, garage, image, onClick }) => {

  const pinColor = "rgba(0,0,0,0.26)";

  const STYLE = {
    height: 150,
    width: 650,
    padding: 15,
    display: "flex",
    borderBottom: `1px solid ${dividerColor}`,

    image: {
      height: 120,
      width: 128,
      objectFit: "cover",
      marginRight: 15,
      borderRadius: 3,
    },
    title: {
      fontSize: "1.2em",
      fontWeight: 500,
      marginBottom: 6,
    },
    ratingsContainer: {
      display: "flex",
      alignItems: "center",
    },
    ratingText: {
      fontSize: "0.9em",
      marginLeft: 8,
    },
    bottomContainer: {
      flexGrow: 1,
      display: "flex",
      alignItems: "flex-end",
    },
    locationContainer: {
      display: "flex",
      alignItems: "center",
    },
    pin: {
      height: 12,
      width: 9,
      fill: pinColor,
    },
    distance: {
      marginLeft: 4,
      color: pinColor,
    },
  };
  
  function ratingText(rating) {
    if (rating > 4.8) {
      return 'Exceptional';
    } else if (rating > 4.3) {
      return 'Excellent';
    } else if (rating > 3.8) {
      return 'Good';
    } else if (rating > 2.9) {
      return 'Average';
    } else if (rating > 2) {
      return 'Poor';
    } else if (rating > 0) {
      return 'Terrible';
    } else {
      return 'None';
    }
  }

  let sublocality = 'Al Quoz';
  if (garage.address_components) {
    const local = garage.address_components.find(item => item.types.some(local => local === 'sublocality'));
    if (local) { sublocality = local.short_name; }
  } 

  return (
    <div
      style={STYLE}
      onClick={onClick}
    >
      <img
        style={STYLE.image}
        src={image}
        alt="garage"
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 style={STYLE.title}>{garage.name}</h2>
        <div style={STYLE.ratingsContainer}>
          <StarRatings
            rating={garage.rating}
            starDimension="20px"
            starSpacing="0px"
            starRatedColor="#FDAF09"
            starEmptyColor="#E4E4E4"
          />
          <span style={STYLE.ratingText}>{ratingText(garage.rating)}</span>
        </div>
        <div style={STYLE.bottomContainer}>
          <div style={STYLE.locationContainer}>
            <LocationPin style={STYLE.pin} />
            <span style={STYLE.distance} className="sm">3.2km</span> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default class GPlacesList extends React.Component {

  static propTypes = {
    garages: PropTypes.array.isRequired,
    onItemClick: PropTypes.func,
  };

  static defaultProps = {
    onItemClick: () => {},
  };

  // componentDidMount() {
  //   loadjs(`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`, this.initMap);
  // }

  // initMap = () => {
  //   if (typeof google === "undefined") { return; }

  //   var mapCenter = new google.maps.LatLng(AL_QUOZ_LOCATION[0], AL_QUOZ_LOCATION[1]); //eslint-disable-line

  //   const map = new google.maps.Map(document.getElementById('map'), { //eslint-disable-line
  //     center: mapCenter,
  //     zoom: 12
  //   });

  //   var request = {
  //     fields,
  //     location: { lat: AL_QUOZ_LOCATION[0], lng: AL_QUOZ_LOCATION[1] },
  //     radius: 10000,
  //     type: 'car_repair',
  //   };

  //   const service = new google.maps.places.PlacesService(map); //eslint-disable-line
  //   service.nearbySearch(request, this.callback);
  // }

  // callback = (results, status) => {
  //   if (status == google.maps.places.PlacesServiceStatus.OK) { //eslint-disable-line
  //     this.setState({ places: results });
  //   }
  // }

  render() {
    const { garages, onItemClick } = this.props;

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <div style={{ display: "none" }} id="map" />
        {garages.map(garage => {
          return (
            <ListItem
              garage={garage}
              image={getPhoto(garage)}
              onClick={() => onItemClick(garage.place_id)}
            />
          );
        })}
      </div>
    )
  }
}

 const LE_URL = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAADxcUdaIVLp4uqgRPF3FIkRCcYGpH1A26Vb1i9Hn0fItFcx9mTuhQ5XFurbqvjZCp8B3pLcqB6TF9G9RUuhq1AS-QgPUELZy31fKexa3ZqQDar5WF0Lcq5Mf2BFFAfKNLEhD0v5JQl0Xmx3ajH8708xAuGhSvkAR-wdxgrBvBdLiJCJiaM2ZaaA&key=AIzaSyDsjdI2R4TNd9bpKcHtVMI6qthrV44C8IY';
import React from 'react';
import Carousel from 'nuka-carousel';

export default class SimpleSlider extends React.Component {
  render() {
    return (
      <Carousel slidesToShow={5} style={{ height: 250 }}>
        <img style={{ height: "100%" }} src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1" />
        <img style={{ height: "100%" }} src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2" />
        <img style={{ height: "100%" }} src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3" />
        <img style={{ height: "100%" }} src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6" />
      </Carousel>
    );
  }
}
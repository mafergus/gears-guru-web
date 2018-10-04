import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import moment from 'moment';

import BookingForm from 'components/forms/BookingForm';
import { getCars } from 'util/api';
import store from 'datastore/store';
import { addReservation } from 'util/api';

const DETAILS_STYLE = {
  container: { display: "flex", flexDirection: "row" },
  image: { height: 150, width: 150, borderRadius: 5 },
  textContainer: { display: "flex", flexDirection: "column", justifyContent: "left", padding: 15 },
  garageName: { marginBottom: 10 },
  appointmentDate: { fontWeight: 500, fontSize: "1.1em" },
};

const Details = ({ garage, appointmentDate }) => (
  <div style={DETAILS_STYLE.container}>
    <img
      style={DETAILS_STYLE.image}
      src={garage.icon}
      alt="garage icon"
    />
    <div style={DETAILS_STYLE.textContainer}>
      <h2 style={DETAILS_STYLE.garageName}>{garage.name}</h2>
      <h4 style={DETAILS_STYLE.appointmentDate}>{appointmentDate}</h4>
    </div>
  </div>
);

const mapStateToProps = (state, props) => {
  const urlValues = queryString.parse(props.location.search);
  return {
    browser: state.browser,
    cars: state.cars,
    carMakes: Object.entries(state.cars).map(entry => ( { uid: entry[0], name: entry[1].make } )),
    garage: state.garages[urlValues.gid],
  };
}

class BookingPage extends React.Component {

  componentDidMount() {
    const cars = getCars();
    cars.then(data => store.dispatch({ type: 'GET_CARS_SUCCESS', cars: data }));
  }

  onSubmit = ({ name, phoneNumber, selectedMake, selectedModel }) => {
    const values = queryString.parse(this.props.location.search);
    const { garage } = this.props;
    const time = moment(values.time);
    let appointment = moment(values.date)
                      .hour(time.hour())
                      .minute(time.minute())
                      .toISOString();
    debugger;
    addReservation({
      name,
      phoneNumber,
      dateTime: appointment,
      guid: garage.uid,
      carModel: selectedModel,
      carMake: selectedMake
    });
  }

  render() {
    const values = queryString.parse(this.props.location.search);
    const { cars, carMakes, garage } = this.props;
    const appointmentDate = moment(values.date).format('dddd, MMMM Do') + ' at ' + moment(values.time).format('h:mma');

    if (!garage) { return null; }

    return (
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", backgroundColor: "#f3f3f3" }}>
        <div style={{ width: "55%", height: "100%" }}>
          
          <div style={{ width: "67%", height: "100%" }}>
            <h2 style={{ marginTop: 20, marginBottom: 20 }}>You're almost done!</h2>

            <Details
              garage={garage}
              appointmentDate={appointmentDate}
            />

            <BookingForm
              cars={cars}
              carMakes={carMakes}
              onSubmit={this.onSubmit}
              style={{ marginTop: 40 }}
            />
          </div>

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BookingPage);
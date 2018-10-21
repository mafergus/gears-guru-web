import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import queryString from 'query-string';
import GPlacesList from 'components/garage-list/GPlacesList';
import history from 'datastore/history';
import { ListHeader, Sidebar, DateTimeHeader } from 'components/search';
import { flatten } from 'util/helpers';
  
// const LE_CAT = {
//   "categoryId1": {
//     "icon": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/icons%2Ficon-car-repair-white.png?alt=media&token=03aca6e4-ba81-43d6-946d-c649ae1d77ed",
//     "image": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/categories%2Fcar-repair.jpg?alt=media&token=50cfe753-fc00-42a8-9e4d-682ff86353b5",
//     "name": "Car Repair"
//   },
//   "categoryId2": {
//     "icon": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/icons%2Ficon-tires-white.png?alt=media&token=f69752cc-18bc-4aca-bb6f-2549fcf725c4",
//     "image": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/categories%2Ftires.jpg?alt=media&token=7a0cba29-9a3b-4337-a416-cac8d4c899d3",
//     "name": "Tires"
//   },
//   "categoryId3": {
//     "icon": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/icons%2Ficon-brakes-white.png?alt=media&token=ccb4697b-d1b8-4eca-b855-6bfadf2f3061",
//     "image": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/categories%2Fbrakes.jpg?alt=media&token=db71d891-12e6-4366-ae48-a3d0bf784907",
//     "name": "Brakes"
//   },
//   "categoryId4": {
//     "icon": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/icons%2Ficon-car-repair-white.png?alt=media&token=03aca6e4-ba81-43d6-946d-c649ae1d77ed",
//     "image": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/categories%2Fworld_auto_body_car-paint-shop-auto-paint-shop.jpg?alt=media&token=f504987d-3850-4ca7-8b23-e877c523b71b",
//     "name": "Body Repair & Painting"
//   },
//   "categoryId5": {
//     "icon": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/icons%2Ficon-car-repair-white.png?alt=media&token=03aca6e4-ba81-43d6-946d-c649ae1d77ed",
//     "image": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/categories%2Fcar-detail.jpg?alt=media&token=b6ada980-1b47-4cca-9336-09560b113736",
//     "name": "Car Interior and Detailing"
//   },
//   "categoryId7": {
//     "icon": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/icons%2Ficon-modifications-white.png?alt=media&token=e59decbe-f585-489b-83b6-e7a68215b3f2",
//     "image": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/categories%2Fmodifications.jpg?alt=media&token=1f30c0ff-6c3b-4989-aa29-da239c83d84c",
//     "name": "Modifications"
//   },
//   "cid10": {
//     "icon": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/icons%2Ficon-repair-white.png?alt=media&token=6329a7ae-6da3-4e53-af09-9a91bff6ad49",
//     "image": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/categories%2Fcar-engine.jpg?alt=media&token=0c271965-c85e-4003-9c0e-053fd4cd155b",
//     "name": "Engine Repair"
//   },
//   "cid11": {
//     "icon": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/icons%2Ficon-electrical-white.png?alt=media&token=5fdd59fd-e3cf-4bd3-a52e-31767bffec5d",
//     "image": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/categories%2Felectrical.jpg?alt=media&token=f63a556f-132b-464f-869d-ce0e9ee6c3fe",
//     "name": "Electrical Work"
//   },
//   "cid12": {
//     "icon": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/icons%2Ficon-diagnostic-white.png?alt=media&token=e8fa8951-cba9-4183-8533-332bffc1c7fe",
//     "image": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/categories%2Fcomputerize.jpg?alt=media&token=793ca4eb-f8a0-4f41-a855-e79bf26541a6",
//     "name": "Computerized Diagnostic"
//   },
//   "cid14": {
//     "icon": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/icons%2Ficon-ac-white.png?alt=media&token=bf572a4a-f0d3-4de7-84a3-3b727be1afb3",
//     "image": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/categories%2Fac.jpg?alt=media&token=425ac760-42dc-43ef-8a50-928de9e8478b",
//     "name": "A\/C"
//   },
//   "cid16": {
//     "icon": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/icons%2Ficon-car-repair-white.png?alt=media&token=03aca6e4-ba81-43d6-946d-c649ae1d77ed",
//     "name": "Other"
//   },
//   "cid8": {
//     "icon": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/icons%2Ficon-car-repair-white.png?alt=media&token=03aca6e4-ba81-43d6-946d-c649ae1d77ed",
//     "image": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/categories%2Fspeedometer.jpg?alt=media&token=de1d7d95-8d33-4296-99b6-f9abe93a4563",
//     "name": "Accessories"
//   },
//   "cid9": {
//     "icon": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/icons%2Ficon-car-repair-white.png?alt=media&token=03aca6e4-ba81-43d6-946d-c649ae1d77ed",
//     "image": "https:\/\/firebasestorage.googleapis.com\/v0\/b\/gears-guru-991bc.appspot.com\/o\/categories%2Fspeedometer.jpg?alt=media&token=de1d7d95-8d33-4296-99b6-f9abe93a4563",
//     "name": "Car Tuning"
//   }
// };

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const mapStateToProps = (state, props) => ({
  categories: flatten(state.categories),
  garages: flatten(state.garages),
});

function Content({ children, ...otherProps }) {
  return (
    <div style={{ height: "100%", width: "45%", display: "flex", marginTop: 15 }}>
      {children}
    </div>
  );
}

class SearchPage extends React.Component {

  static propTypes = {
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  onItemClick = gid => {
    const values = queryString.parse(this.props.location.search);
    history.push('/booking?date=' + values.date + '&time=' + values.time + '&gid=' + gid);
    window.location.reload();
  }

  render() {
    const { garages, location, style } = this.props;

    debugger;

    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", ...style }}>
        <DateTimeHeader location={location} />
        <Content>
          {/*<Sidebar
            categories={flatten(LE_CAT)}
            garages={garages}
          />*/}
          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <ListHeader
              count={garages.length}
              onSortChange={this.onSortChange}
              location={location}
            />
            <GPlacesList
              style={{ width: "67%" }}
              onItemClick={this.onItemClick}
              garages={garages}
            />
          </div>
        </Content>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(SearchPage));

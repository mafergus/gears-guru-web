import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import uuid from 'uuid/v1';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import firebase from 'datastore/database';

const HOURS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

function Br() {
  return (
    <div style={{ height: 40 }}>
    </div>
  );
}

function mapStateToProps(state, props) {
  const garage = state.garages[props.match.params.id] || null;
  return {
    garage,
    categories: (garage && Object.keys(state.categories).length > 0) && Object.keys(garage.categories).map(categoryId => {
      const cat = state.categories[categoryId];
      return cat;
    }),
  };
}

class GarageAdmin extends React.Component {
  
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  state = {
    dialogOpen: false,
    facebook: '',
    hours: [
      { close: '', open: ''},
      { close: '', open: ''},
      { close: '', open: ''},
      { close: '', open: ''},
      { close: '', open: ''},
      { close: '', open: ''},
      { close: '', open: ''},
    ],
    locations: [],
    images: [],
    name: '',
    phoneNumber: '',
    icon: '',
    isHoursExpanded: false,
    website: '',
  };

  componentDidMount = () => {
    const { garage } = this.props;

    this.populateState(garage);
  }

  componentDidUpdate = prevProps => {
    const { garage } = this.props;

    if (garage === null) {
      return;
    }

    if (prevProps.garage === null || garage.uid !== prevProps.garage.uid) {
      this.populateState(garage);
    }
  }

  populateState = garage => {
    if (garage === null) { return; }

    this.setState({
      facebook: garage.facebook,
      hours: garage.hours,
      locations: garage.locations,
      name: garage.name,
      phoneNumber: garage.phoneNumber,
      icon: garage.icon,
      images: garage.images,
      website: garage.website,
    });
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    const { match } = this.props;
    console.log("Accepted: ", acceptedFiles, " rejected: ", rejectedFiles);

    const storageRef = firebase.storage().ref();
    const leUuid = uuid();
    const imageRef = storageRef.child('garages/' + match.params.id + '/icons/' + leUuid);
    var dlUrl = null;
    imageRef.put(acceptedFiles[0]).then(snapshot => {
      return snapshot.task.snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
      dlUrl = downloadURL;
      const update = { icon: downloadURL };
      return firebase.database().ref('garages/' + match.params.id).update(update);
    }).then(snapshot => {
      this.setState({ icon: dlUrl });
    });
  }

  updateData = (propId, val) => {
    const { match } = this.props;
    const newState = {};
    newState[propId] = val;
    this.setState(newState, () => {
      firebase.database().ref('garages/' + match.params.id).update(newState);
    });
  }

  renderTextField(text, value, propName) {
    return (
      <TextField
        style={{ width: 300 }}
        label={text}
        onChange={(event, value) => this.updateData(propName, event.target.value)}
        value={value}
      />
    );
  }

  renderUpdateIcon = () => {
    const { icon } = this.state;

    return (
      <div>
        <div style={{ display: "flex" }}>
          <h3>Edit Icon</h3>
          <Dropzone
            style={{ width: 130, marginLeft: 15 }}
            accept="image/jpeg, image/png"
            onDrop={this.onDrop}
          >
            <Button
              label="Upload"
              variant="raised" 
              color="secondary"
            >
              Upload
            </Button>
          </Dropzone>
        </div>
        <Br />
        {icon && 
          <img
            src={icon}
            style={{ 
              height: 200,
              width: 200,
              objectFit: "contain",
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: "gray",
            }}
            alt="garage icon"
          />
        }
        <Br />
      </div>
    );
  }

  updateHour = (isOpen, val, index) => {
    const { match } = this.props;
    const { hours } = this.state;
    const newHours = [ ...hours ];
    newHours[index][isOpen ? 'open' : 'close'] = val;
    const newState = {};
    newState[isOpen ? 'open' : 'close'] = val;

    this.setState({ hours: newHours });
    firebase.database().ref('garages/' + match.params.id + "/hours/" + index).update(newState);
  }

  renderHour = (isOpen, val, index) => {
    return (
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <h5 style={{ marginRight: 15 }}>{isOpen ? 'Open' : 'Close'}: </h5>
        <TextField
          onChange={(event, value) => this.updateHour(isOpen, event.target.value, index)}
          value={val}
        />
      </div>
    );
  }

  renderHours = () => {
    const { hours, isHoursExpanded } = this.state;

    return (
      <div>
        <div style={{ display: "flex" }}>
          <h3>Garage Hours</h3>
          <Button
            label="Upload"
            variant="raised" 
            color="secondary"
            style={{ marginLeft: 15 }}
            onClick={() => this.setState({ isHoursExpanded: !isHoursExpanded })}
          >
            {isHoursExpanded ? 'Collapse -' : 'Expand +'}
          </Button>
        </div>
        {isHoursExpanded && hours.map((item, index) => {
          return (
            <div>
              <div style={{ paddingLeft: 30 }}>
                <Br />
                <h5>{HOURS[index]}</h5>
                {this.renderHour(true, hours[index].open, index)}
                {this.renderHour(false, hours[index].close, index)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  onUploadImage = (acceptedFiles, rejectedFiles) => {
    const { match } = this.props;
    console.log("Accepted: ", acceptedFiles, " rejected: ", rejectedFiles);

    const storageRef = firebase.storage().ref();
    const leUuid = uuid();
    const imageRef = storageRef.child('garages/' + match.params.id + "/images/" + leUuid);
    imageRef.put(acceptedFiles[0]).then(snapshot => {
      return snapshot.task.snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
      return firebase.database().ref('garages/' + match.params.id + "/images/" + leUuid).set(downloadURL);
    }).then(snapshot => {
      window.location.reload();
    });
  }

  deleteImage = imageUid => {
    const { match } = this.props;
    const garageUid = match.params.id;

    const dataRef = firebase.database().ref('garages/' + garageUid + '/images/' + imageUid);
    const storageRef = firebase.storage().ref('garages/' + garageUid + '/images/' + imageUid);
    dataRef.remove().then(() => storageRef.delete()).then(() => window.location.reload());
  }

  renderImages = () => {
    const { images } = this.state;

    return (
      <div>
        <div style={{ display: "flex" }}>
          <h3>Edit Images</h3>
          <Dropzone
            style={{ width: 130, marginLeft: 15 }}
            accept="image/jpeg, image/png"
            onDrop={this.onUploadImage}
          >
            <Button
              label="Upload"
              variant="raised" 
              color="secondary"
            >
              Upload
            </Button>
          </Dropzone>
        </div>
        <Br />
        {images && Object.entries(images).map(entry => {
          return (
            <div key={entry[0]} style={{ width: 200, height: 200, position: "relative", display: "inline-block" }}>
              <img src={entry[1]} style={{ width: "100%", height: "100%" }} alt="garage image"/>
              <Button
                label="Upload"
                variant="raised" 
                color="secondary"
                style={{ position: "absolute", right: 10, bottom: 10 }}
                onClick={() => this.deleteImage(entry[0])}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    );
  }

  updateLocation = (propName, val, index) => {
    const garageUid = this.props.match.params.id;
    const { locations } = this.state;
    const newLocations = [ ...locations ];
    newLocations[index][propName] = val;
    const update = {};
    update[propName] = val;

    this.setState({ locations: newLocations });
    firebase.database().ref('garages/' + garageUid + "/locations/" + index).update(update);
  }

  renderLocation = (val, index) => {
    const propNames = [ 'lat', 'long', 'address', 'neighborhood'];

    return (
      <div>
        <h4>{index}</h4>
        <Br />
        {propNames.map(item => {
          return (
            <TextField
              key={item}
              label={item}
              onChange={(event, value) => this.updateLocation(item, event.target.value, index)}
              value={val[item]}
              style={{ display: "block", marginBottom: 15 }}
            />
          );
        })}
      </div>
    );
  }

  renderLocations = () => {
    const { locations } = this.state;

    return (
      <div>
        <h3>Branches</h3>
        <Br />
        {locations.map((item, index) => this.renderLocation(item, index))}
      </div>
    );
  }

  handleClose = shouldDelete => {
    const garageUid = this.props.match.params.id;

    if (shouldDelete) {
      firebase.database().ref('garages/' + garageUid)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() && snapshot.val().images) {
          const images = snapshot.val().images;
          Object.entries(images).map(entry => {
            firebase.storage().ref('garages/' + garageUid + '/images/' + entry[0]).delete();
          });
          return null;
        }
      })
      .then(() => firebase.database().ref('garages/' + garageUid).remove())
      .then(() => this.props.history.goBack());
    }

    this.setState({ dialogOpen: false});
  }

  renderDialog = () => {
    return (
      <div>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action is final, the garage info cannot be recovered
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={() => this.handleClose(true)} color="secondary" autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  renderServices = () => {
    const { categories } = this.props;
    if (!categories) { return null; }

    return (
      <div>
        <h4>Services</h4>
        <Br />
        {categories.map(category => <p>{category.name}</p>)}
      </div>
    );
  }

  render() {
    const { garage } = this.props;
    const { facebook, name, phoneNumber, website } = this.state;

    return (
      <div style={{ width: "100%", height: "100%", margin: 50 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", marginBottom: 50 }}>
            <h1 style={{ marginRight: 15 }}>{garage ? "Edit" : "Add"} Garage</h1>
            <Button
              label="Upload"
              variant="raised" 
              color="secondary"
              onClick={() => this.setState({ dialogOpen: true })}
            >
              Delete
            </Button>
          </div>
          {this.renderTextField('Garage Name', name, 'name')}
          <Br />
          {this.renderTextField('Telephone Number', phoneNumber, 'phoneNumber')}
          <Br />
          {this.renderUpdateIcon()}
          <Br />
          {this.renderTextField('Facebook', facebook, 'facebook')}
          <Br />
          {this.renderTextField('Website', website, 'website')}
          <Br />
          {this.renderHours()}
          <Br />
          {this.renderImages()}
          <Br />
          {this.renderLocations()}
          <Br />
          {this.renderServices()}
        </div>
        {this.renderDialog()}
      </div>
    );
  }
}

export default connect(mapStateToProps)(GarageAdmin);
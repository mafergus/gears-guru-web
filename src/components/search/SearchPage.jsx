import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import queryString from 'query-string';

import { Button as GGButton } from 'gg-common';
import { DateSelect, TimeSelect } from 'components/ui/selects';
import { dividerColor } from 'util/colors';
import GPlacesList from 'components/garage-list/GPlacesList';
import history from 'datastore/history';


const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SearchPage extends React.Component {

  state = {
    modalOpen: false,
    name: {
      value: '',
      errorText: 'Enter your name',
      hasError: false,
      validate: value => value.length > 0
    },
    phoneNumber: {
      value: '',
      errorText: 'Enter a valid phone number',
      hasError: false,
      validate: value => value.length > 0
    },
  };

  updateData = (propName, value) => {
    let newState = {}
    newState[propName] = this.state[propName];
    newState[propName].value = value;
    newState[propName].hasError = !this.state[propName].validate(value);
    this.setState({ newState });
  }

  submit = () => {

  }

  renderModal = () => {
    const { modalOpen, name, phoneNumber } = this.state;

    return (
      <Dialog
        onClose={() => this.setState({ modalOpen: false })}
        aria-labelledby="simple-dialog-title"
        open={modalOpen}
      >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            style={{ width: 300 }}
            label={name.hasError ? name.errorText : "Name"}
            onChange={(event, value) => this.updateData('name', event.target.value)}
            value={name.value}
            error={name.hasError}
          />
          <TextField
            style={{ width: 300 }}
            label={phoneNumber.hasError ? phoneNumber.errorText : "Phone Number"}
            onChange={(event, value) => this.updateData('phoneNumber', event.target.value)}
            value={phoneNumber.value}
            error={phoneNumber.hasError}
          />
          <Button 
            variant="raised"
            onClick={this.submit}
            color="secondary"
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    );
  }

  renderDateTimeSelect = () => {
    const values = queryString.parse(this.props.location.search);
    return (
      <Grid container style={{ width: "67%", display: "flex", justifyContent: "center" }}>
        <DateSelect
          width={300}
          onChange={() => {}}
          value={new Date(values.date)}
        />
        <TimeSelect
          style={{ borderLeft: `1px solid ${dividerColor}` }}
          width={300}
          onChange={() => {}}
          value={new Date(values.time)}
        />
        <Grid
          xs={10}
          md={2}
          item
        >
          <GGButton
            style={{ height: 45, width: "100%" }}
            variant="square"
            onClick={() => {}}
          >SEARCH</GGButton>
        </Grid>
      </Grid>
    );
  }

  onItemClick = gid => {
    const values = queryString.parse(this.props.location.search);
    history.replace('/booking?date=' + values.date + '&time=' + values.time + '&gid=-LHGNq7Y2HUiDIVAzW6z');
  }

  render() {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ width: "100%" }}>
          {this.renderDateTimeSelect()}
        </div>
        <div style={{ height: "100%", width: "67%", display: "flex" }}>
          <div style={{ width: "33%", backgroundColor: "blue" }}>
          </div>
          <GPlacesList style={{ width: "67%" }} onItemClick={this.onItemClick}/>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

export default withStyles(styles)(SearchPage);

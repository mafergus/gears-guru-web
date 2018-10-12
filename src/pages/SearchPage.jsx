import React from 'react';
import PropTypes from 'prop-types';
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
import SearchBgImage from 'assets/search-header-bg.jpg';
import { primary } from 'util/colors';
import ListHeader from 'components/search/ListHeader';

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

  static propTypes = {
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

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

  onSortChange = sortBy => {

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
      <div
        style={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          padding: "25px 0px",
          backgroundImage: `url(${SearchBgImage})`,
          backgroundSize: "cover",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: primary[500], opacity: 0.5 }}>
        </div>
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
      </div>
    );
  }

  onItemClick = gid => {
    const values = queryString.parse(this.props.location.search);
    history.replace('/booking?date=' + values.date + '&time=' + values.time + '&gid=-LHGNq7Y2HUiDIVAzW6z');
  }

  render() {
    const { location, style } = this.props;

    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", ...style }}>
        <div style={{ width: "100%" }}>
          {this.renderDateTimeSelect()}
        </div>
        <div style={{ height: "100%", width: "67%", display: "flex" }}>
          <div style={{ width: "33%", backgroundColor: "blue" }}>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ListHeader count={12} onSortChange={this.onSortChange} location={location} />
            <GPlacesList style={{ width: "67%" }} onItemClick={this.onItemClick}/>
          </div>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

export default withStyles(styles)(SearchPage);

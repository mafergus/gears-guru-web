import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function mapStateToProps(state, props) {
  return {
    categories: Object.entries(state.categories).map(entry => {
      return { ...entry[1], uid: entry[0] };
    }),
  };
}

class ServiceSelector extends React.Component {

  static propTypes = {
    categories: PropTypes.array,
    onSubmit: PropTypes.func,
    style: PropTypes.object,
  };

  static defaultProps = {
    categories: [],
    onSubmit: () => {},
    style: {},
  };

  state = {
    service: 0
  };

  handleChangeService = event => {
    this.setState({ service: event.target.value })
  };

  render() {
    const { categories, onSubmit, style } = this.props;
    const { service } = this.state;

    return (
      <Grid 
        container 
        style={{ ...style, zIndex: 10, pointerEvents: "none" }}
        className="centered-container"
      >
        <Grid 
          item
          xs={12}
          sm={8}
          md={4}
          lg={3}
          style={{ display: "flex", flexDirection: "column", backgroundColor: "rgba(255, 255, 255, 0.85)", padding: 30, borderRadius: 3 }}
          className="centered-container"
        >
          <h1 style={{ textAlign: "center" }}>Find a top rated mechanic near you</h1>
          <div style={{ marginTop: 55, display: "flex", width: "100%", alignItems: "center", pointerEvents: "auto" }}>
            <FormControl style={{ flexGrow: 1 }}>
              <InputLabel htmlFor="add-service">Service</InputLabel>
              <Select
                native
                value={service}
                onChange={this.handleChangeService}
                style={{ width: "100%" }}
                inputProps={{
                  name: 'age',
                  id: 'add-service',
                }}
              >
                {categories.map((item, index) =>  <option value={index}>{item.name}</option>)}
              </Select>
            </FormControl>
            <Button
              style={{ height: 30, marginLeft: 25, minWidth: 130 }}
              variant="raised"
              onClick={() => onSubmit(categories[service])}
              color="secondary"
            >
              Find Garage
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(ServiceSelector);
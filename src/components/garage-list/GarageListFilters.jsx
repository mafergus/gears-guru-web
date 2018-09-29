import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import history from 'datastore/history';

function mapStateToProps(state, props) {
  return {
     categories: Object.entries(state.categories).map(entry => {
      return { ...entry[1], uid: entry[0] };
    }),
  };
}

const SORT = [
  "Distance",
  "Top Rated",
];

class GarageListFilters extends React.Component {

  static propTypes = {
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  state = {
    service: 0,
    sort: 0,
  };

  handleChangeService = event => {
    this.setState({ service: event.target.value })
  };

  handleChangeSort = event => {
    switch (event.target.value.toLowerCase()) {
      case 'distance':
        history.push('?sortBy=distance');
        break;
      case 'top rated':
        history.push('?sortBy=top-rated');
        break;
      default:
        break;
    }
    this.setState({ sort: event.target.value });
  };

  render() {
    const { categories, style } = this.props;
    const { service, sort } = this.state;

    return (
      <div 
        style={{ 
          width: "100%",
          height: 50,
          display: "flex",
          alignItems: "center",
          paddingLeft: 35,
          paddingRight: 35,
          ...style,
        }}
      >
        <h4 style={{ fontWeight: 400, marginRight: 10 }}>Sort By:</h4>
        <FormControl>
          <Select
            native
            value={sort}
            onChange={this.handleChangeSort}
            style={{ width: "100%" }}
            inputProps={{
              name: 'age',
              id: 'sort-list',
            }}
          >
            {SORT.map((item, index) =>  <option value={item}>{item}</option>)}
          </Select>
        </FormControl>
        <h4 style={{ fontWeight: 400, marginRight: 10, marginLeft: 20 }}>Service Type:</h4>
        <FormControl>
          <Select
            native
            value={service}
            onChange={this.handleChangeService}
            style={{ width: "100%" }}
            inputProps={{
              name: 'age',
              id: 'filter-service',
            }}
          >
            {categories.map((item, index) =>  <option value={index}>{item.name}</option>)}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GarageListFilters);
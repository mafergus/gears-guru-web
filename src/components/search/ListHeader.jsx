import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import MenuItem from '@material-ui/core/MenuItem';

import { SelectInput } from 'components/ui/selects';
import { gray } from 'util/colors';
import history from 'datastore/history';

const SORTS = [
  "popular",
  "alphabetic",
];

const STYLE = {
  container: {
    height: 60,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: 500,
  },
}

export default class ListHeader extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    count: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired,
    onSortChange: PropTypes.func.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    style: {},
  };

  handleChange = event => {
    const { location } = this.props;
    const newSort = event.target.value;
    const { sortBy, ...otherParams } = queryString.parse(location.search);
    const queryStr = Object.entries(otherParams).map(entry => `${entry[0]}=${entry[1]}`).join('&');
    const newUrl = location.pathname + '?' + queryStr + `&sortBy=${newSort}`;
    history.replace(newUrl);
  }

  render() {
    const { className, count, location, onSortChange, style } = this.props;
    const values = queryString.parse(location.search);

    return (
      <div style={{ ...STYLE.container, ...style }} className={className}>

        <span style={STYLE.text}>{`${count} GARAGES FOUND`}</span>

        <SelectInput
          style={{ display: "inline-block" }}
          selected={values.sortBy}
          handleChange={this.handleChange}
        >
          <MenuItem key="42" value="42" style={{ color: gray }} disabled>Sort By</MenuItem>
          {SORTS.map(item => <MenuItem key={item} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</MenuItem>)}
        </SelectInput>

      </div>
    );
  }
}

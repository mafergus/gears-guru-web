import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Stars from '@material-ui/icons/Stars';

const rankedCategories = [
  {
    rank: 1,
    categoryId: "cat1id",
  },
  {
    rank: 2,
    categoryId: "catId2",
  }
];

export default class TopCategoriesList extends React.Component {

  static propTypes = {
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  renderCategory = category => {
    return (
      <div style={{ width: "100%", display: "flex", alignItems: "center", paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingRight: 5 }}>
        <Stars />
        {`Ranked #${category.rank} for`}
        <Link to="/customers" style={{ textDecoration: 'none' }}>Car Repair</Link>
      </div>
    );
  }

  constructor() {
    super();
  }

  render() {
    const { style } = this.props;

    return (
      <div style={{ ...style }}>
        {
          rankedCategories.map(item => this.renderCategory(item))
        }
      </div>
    );
  }
}
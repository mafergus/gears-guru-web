import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import Stars from '@material-ui/icons/Stars';
import { textDark } from 'util/colors';

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
    lists: PropTypes.array.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  renderCategory = category => {
    return (
      <div style={{ width: "100%", display: "flex", alignItems: "center", padding: 6 }}>
        <Stars style={{ color: textDark.secondary, marginRight: 5 }}/>
        <span style={{ color: textDark.secondary }}>Ranked&nbsp;</span>
        <Link to={`/lists/${category.uid}`} style={{ textDecoration: 'none' }}>{`#${category.rank} `}</Link><span>&nbsp;</span><span style={{ color: textDark.secondary }}>for&nbsp;</span>
        <Link to={`/lists/${category.uid}`} style={{ textDecoration: 'none' }}>{category.name}</Link>
      </div>
    );
  }

  render() {
    const { lists, style } = this.props;

    return (
      <div style={{ ...style }}>
        {
          lists.map(item => this.renderCategory(item))
        }
      </div>
    );
  }
}
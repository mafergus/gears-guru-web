import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Presentation from 'components/landing/presentation/CategoriesSection';

function mapStateToProps(state, props) {
  const categories = Object.entries(state.categories).map(entry => {
    return { uid: entry[0], ...entry[1] }
  });

  return {
    categories,
  }
}

class CategoriesSection extends React.Component {

  static propTypes = {
    browser: PropTypes.object.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  render() {
    const { browser, categories, style } = this.props;

    return (
      <Presentation
        categories={categories}
        style={style}
        browser={browser}
      />
    );
  }
}

export default connect(mapStateToProps)(CategoriesSection);
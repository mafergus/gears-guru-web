import React from 'react';
import PropTypes from 'prop-types';

import Presentation from 'components/landing/presentation/JumboSection';
import { withBrowser } from 'util/withBrowser';

class JumboSection extends React.Component {

  static propTypes = {
    browser: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      make: 0,
      model: 0,
    };
  }

  handleChange = propName => {
  }

  onSubmit = () => {};

  render() {
    const { browser } = this.props;
    const { allTheCars } = this.state;

    return (
      <Presentation
        browser={browser}
        handleChange={() => {}}
        onSubmit={() => {}}
      />
    );
  }
}

export default withBrowser(JumboSection);
import React from 'react';
import PropTypes from 'prop-types';

import Presentation from 'components/landing/presentation/JumboSection';
import { withBrowser } from 'util/withBrowser';
import history from 'datastore/history';

class JumboSection extends React.Component {

  static propTypes = {
    browser: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      date: null,
      time: null,
    };
  }

  handleChangeDate = date => this.setState({ date });

  handleChangeTime = time => this.setState({ time });

  onSubmit = () => {
    const { date, time } = this.state;
    const dateStr = encodeURI(date.toISOString());
    const timeStr = encodeURI(time.toISOString());
    history.push('/s/?date=' + dateStr + '&time=' + timeStr);
  }

  render() {
    const { browser } = this.props;

    return (
      <Presentation
        browser={browser}
        handleChangeDate={this.handleChangeDate}
        handleChangeTime={this.handleChangeTime}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default withBrowser(JumboSection);
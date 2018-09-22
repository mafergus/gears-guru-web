import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Schedule from '@material-ui/icons/Schedule';
import moment from 'moment';
import TimePicker from 'material-ui/TimePicker';

import DropDown from 'components/landing/presentation/DropDown';
import 'react-datepicker/dist/react-datepicker.css';

function mapStateToProps(state, props) {
  return {
    browser: state.browser,
  };
}

class TimeDropDown extends React.Component {

  static propTypes = {
    style: PropTypes.object,
    width: PropTypes.number,
  };

  static defaultProps = {
    style: {},
    width: 140,
  };

  state = {
    date: moment().add(1, 'hours').minute(0).toDate()
  };

  render() {
    const { browser, style, width } = this.props;
    const { date } = this.state;

    return (
      <DropDown
        icon={Schedule}
        style={{ borderRadius: 0, ...style }}
        width={width}
      >
        <TimePicker 
          name="date"
          underlineShow={false} 
          onChange={(placeholder, date) => this.setState({ date })}
          minutesStep={30}
          value={date}
        />
      </DropDown>
    );
  }
}

export default connect(mapStateToProps)(TimeDropDown);
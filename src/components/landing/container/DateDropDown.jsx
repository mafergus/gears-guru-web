import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CalendarToday from '@material-ui/icons/CalendarToday';
import moment from 'moment';
import MaterialDatePicker from 'material-ui/DatePicker';

import DropDown from 'components/landing/presentation/DropDown';
import 'react-datepicker/dist/react-datepicker.css';

function mapStateToProps(state, props) {
  return {
    browser: state.browser,
  };
}

class DateDropDown extends React.Component {

  static propTypes = {
    width: PropTypes.number,
  };

  static defaultProps = {
    width: 225,
  };

  state = {
    date: new Date()
  }

  render() {
    const { browser, width } = this.props;
    const { date } = this.state;

    return (
      <DropDown
        icon={CalendarToday}
        width={width}
      >
        <MaterialDatePicker 
          name="date"
          minDate={new Date()}
          underlineShow={false} 
          onChange={(placeholder, date) => this.setState({ date })}
          value={date}
          formatDate={new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format}
        />
      </DropDown>
    );
  }
}

export default connect(mapStateToProps)(DateDropDown);
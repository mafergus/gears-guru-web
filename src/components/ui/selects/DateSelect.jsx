import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CalendarToday from '@material-ui/icons/CalendarToday';
import MaterialDatePicker from 'material-ui/DatePicker';

import { DateTimeSelect } from 'components/ui/selects';
import 'react-datepicker/dist/react-datepicker.css';

function mapStateToProps(state, props) {
  return {
    browser: state.browser,
  };
}

class DateSelect extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
    width: PropTypes.number,
  };

  static defaultProps = {
    onChange: () => {},
    value: null,
    width: 225,
  };

  state = {
    date: new Date()
  }

  componentDidMount() {
    this.update(undefined, new Date());
  }

  update = (placeholder, date) => {
    const { onChange } = this.props;
    this.setState({ date });
    onChange(date);
  }

  render() {
    const { value, width } = this.props;
    const { date } = this.state;

    return (
      <DateTimeSelect
        icon={CalendarToday}
        width={width}
      >
        <MaterialDatePicker 
          name="date"
          minDate={new Date()}
          underlineShow={false} 
          onChange={this.update}
          value={value ? value : date}
          formatDate={new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format}
        />
      </DateTimeSelect>
    );
  }
}

export default connect(mapStateToProps)(DateSelect);
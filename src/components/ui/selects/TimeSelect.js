import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Schedule from '@material-ui/icons/Schedule';
import moment from 'moment';
import TimePicker from 'material-ui/TimePicker';

import { DateTimeSelect } from 'components/ui/selects';
import 'react-datepicker/dist/react-datepicker.css';

function mapStateToProps(state, props) {
  return {
    browser: state.browser,
  };
}

class TimeSelect extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    style: PropTypes.object,
    value: PropTypes.object,
    width: PropTypes.number,
  };

  static defaultProps = {
    onChange: () => {},
    style: {},
    value: null,
    width: 140,
  };

  state = {
    date: moment().add(1, 'hours').minute(0).toDate()
  };

  update = (placeholder, date) => {
    const { onChange } = this.props;
    this.setState({ date });
    onChange(date);
  }

  render() {
    const { style, value, width } = this.props;
    const { date } = this.state;

    return (
      <DateTimeSelect
        icon={Schedule}
        style={{ borderRadius: 0, ...style }}
        width={width}
      >
        <TimePicker 
          name="date"
          underlineShow={false} 
          onChange={this.update}
          minutesStep={30}
          value={value ? value : date}
        />
      </DateTimeSelect>
    );
  }
}

export default connect(mapStateToProps)(TimeSelect);
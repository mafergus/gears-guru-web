import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { textDark } from 'util/colors';

const daysOfWeek = [
  "Sun",
  "Mon",
  "Tues",
  "Weds",
  "Thurs",
  "Fri",
  "Sat",
];

export default class Hours extends React.Component {
  
  static propTypes = {
    hours: PropTypes.array,
    style: PropTypes.object,
  };

  static defaultProps = {
    hours: [],
    style: {},
  };

  constructor() {
    super();

    this.state = {
      isExpanded: false,
    };
  }

  expand = () => this.setState({ isExpanded: !this.state.isExpanded });

  renderItem = (item, index) => {
    return (
      <p style={{ padding: 6, width: "100%", display: "flex", color: textDark.secondary }}>
        <span>{daysOfWeek[index]}</span>
        <span style={{ flexGrow: 1, textAlign: "right" }}>{item.open} - {item.close}</span>
      </p>
    );
  };

  isOpen = (open, close) => {
    let openInt = parseInt(open.replace(':', ''), 10);
    let closeInt = parseInt(close.replace(':', ''), 10);
    // Closes tomorrow
    if (closeInt < openInt) { closeInt += 2400; }
    let now = moment().hour() + '' + (moment().minute() < 10 ? '0' : '') + moment().minute();
    now = parseInt(now, 10);
    return (closeInt >= now && now >= openInt);
  };

  getIsOpen = hours => {
    const day = moment().day();
    const isOpen = this.isOpen(hours[day].open, hours[day].close);
    return isOpen ? <span style={{ color: "green" }}>{`Open until ${hours[day].close}`}</span>
      : <span style={{ color: "red" }}>{`Closed until ${hours[day+1 % 7].open}`}</span>;
  };

  render() {
    const { hours, style } = this.props;
    if (hours.length === 0) { return null; }
    const { isExpanded } = this.state;

    return (
      <div style={style}>
        <p style={{ color: textDark.secondary }}>
          {this.getIsOpen(hours)}
          <a 
            style={{ color: "blue" }}
            onClick={this.expand}
          >
            {` (Show ${isExpanded ? 'less' : 'more'})`}
          </a>
        </p>
        {isExpanded && hours &&
          <div style={{ marginLeft: 6, marginTop: 6 }}>
            {hours.map((item, index) => this.renderItem(item, index))}
          </div>
        }
      </div>
    );
  }
}
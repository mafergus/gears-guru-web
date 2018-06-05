import React from 'react';
import PropTypes from 'prop-types';

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
    hours: PropTypes.array.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
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

  render() {
    const { hours, style } = this.props;
    const { isExpanded } = this.state;
    const day = new Date().getDay();

    return (
      <div style={style}>
        <p>
          <span>{`Open until 8:00 PM `}</span>
          <a 
            style={{ color: "blue" }}
            onClick={this.expand}
          >
            {`(Show ${isExpanded ? 'less' : 'more'})`}
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
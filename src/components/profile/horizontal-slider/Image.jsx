import React from 'react';
import PropTypes from 'prop-types';

export default class Image extends React.Component {

  static propTypes = {
    number: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };
  
  render() {
    const { style, src, number } = this.props;

    return (
      <li style={{ height: 200, width: 200, display: "inline-block", backgroundColor: "yellow", ...style }}>
        {number}
      </li>
    );
  }
}
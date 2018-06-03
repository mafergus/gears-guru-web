import React from 'react';
import PropTypes from 'prop-types';

export default class Image extends React.Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };
  
  render() {
    const { style, src } = this.props;

    return (
      <li style={{ height: 200, width: 200, display: "inline-block", borderRadius: 3, ...style }}>
        <img 
          src={src}
          style={{ 
            width: "100%",
            height: "100%",
            borderRadius: 3,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.08)",
          }} 
        />
      </li>
    );
  }
}
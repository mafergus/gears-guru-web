import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class LocationPane extends React.Component {

  static propTypes = {
    className: PropTypes.any,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    style: {}
  };

  render() {
    const { className, style } = this.props;

    return (
      <div className={className} style={{ ...style }}>
      </div>
    );
  }
}
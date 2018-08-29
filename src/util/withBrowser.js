import React from 'react';
import { connect } from 'react-redux';

export const withBrowser = (WrappedComponent) => {

  const mapStateToProps = (state, props) => {
    return {
      browser: state.browser,
    };
  }

  class HOC extends React.Component {
    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  return connect(mapStateToProps)(HOC);
}

export const allWithBrowser = (browser) => (children) => {
  return children.map(child => withBrowser(browser)(child));
}
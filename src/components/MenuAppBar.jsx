import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppBar } from 'gg-common';

import AuthModal from 'components/auth/AuthModal';
import { signOut } from 'util/api';

function mapStateToProps(state, props) {
  return {
    authedUser: state.authedUser || {},
    browser: state.browser,
  };
}

const getStyles = browser => {
  const style = {
    container: { 
      position: "absolute",
      right: 10
    },
    logo: {
      height: browser.lessThan.small ? 20 : 35,
      marginRight: browser.lessThan.small ? 0 : 12,
    },
    signUpButton: {
      height: 30,
      marginLeft: 15
    },
    title: {
      fontSize: browser.lessThan.small ? "0.8em" : "1.1em",
    },
  };

  return style;
}

class MenuAppBar extends React.Component {

  static propTypes = {
    style: PropTypes.object,
    browser: PropTypes.object.isRequired,
    title: PropTypes.string,
    transparent: PropTypes.bool,
  };

  static defaultProps = {
    style: {},
    title: "",
    transparent: false,
  };

  state = {
    auth: true,
    anchorEl: null,
    logInModalOpen: false,
    signUpModalOpen: false,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  onMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClick = () => {
    this.handleClose();
    signOut();
  }

  renderMenu = () => {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={this.handleClose}
      >
        <MenuItem onClick={this.handleClick}>Sign Out</MenuItem>
      </Menu>
    );
  }

  onLogInClick = () => this.setState({ logInModalOpen: true });

  onSignUpClick = () => this.setState({ signUpModalOpen: true });

  render() {
    const { browser, transparent } = this.props;
    const { logInModalOpen, signUpModalOpen } = this.state;
    const style = getStyles(browser);

    return (
      <AppBar
        style={style}
        browser={browser}
        transparent={transparent}
        disableGutters={browser.lessThan.small}
        onLogInClick={this.onLogInClick}
        onSignUpClick={this.onSignUpClick}
        onMenuClick={this.onMenuClick}
        menu={this.renderMenu}
      >
        <AuthModal
          title="Log In"
          isOpen={logInModalOpen}
          handleClose={() => this.setState({ logInModalOpen: false })}
        />
        <AuthModal 
          title="Sign Up"
          isOpen={signUpModalOpen}
          handleClose={() => this.setState({ signUpModalOpen: false })} 
        />
      </AppBar>
    );
  }
}

export default connect(mapStateToProps)(MenuAppBar);
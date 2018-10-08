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
import { MenuAppBar } from 'gg-common';

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

class AppBar extends React.Component {

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

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClick = () => {
    this.handleClose();
    signOut();
  }

  renderLogin = style => {
    const { authedUser } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div style={style.container}>
        {authedUser.hasOwnProperty("uid") ?
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
          </div> :
          <div>
            <Button
              style={{ color: "white" }}
              variant="outlined"
              color="secondary"
              onClick={() => this.setState({ logInModalOpen: true })}
            >
              Log In
            </Button>
            <Button 
              style={style.signUpButton}
              variant="raised"
              onClick={() => this.setState({ signUpModalOpen: true })}
              color="secondary"
            >
              Sign Up
            </Button>
            <AuthModal
              title="Log In"
              isOpen={this.state.logInModalOpen}
              handleClose={() => this.setState({ logInModalOpen: false })}
            />
            <AuthModal 
              title="Sign Up"
              isOpen={this.state.signUpModalOpen}
              handleClose={() => this.setState({ signUpModalOpen: false })} 
            />
          </div>
        }
      </div>
    );
  }

  render() {
    const { browser, transparent } = this.props;
    const style = getStyles(browser);

    return (
      <MenuAppBar
        style={style}
        transparent={transparent}
        disableGutters={browser.lessThan.small}
      >
        {this.renderLogin(style)}
      </MenuAppBar>
    );
  }
}

export default connect(mapStateToProps)(AppBar);
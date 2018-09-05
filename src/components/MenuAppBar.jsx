import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthModal from 'components/auth/AuthModal';
import { Logo } from 'assets/Logo';
import { primary } from 'util/colors';
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
    link: { 
      display: "flex",
      position: "relative",
      alignItems: "center",
      textDecoration: "none",
      color: "white"
    },
    logo: {
      height: browser.lessThan.small ? 20 : 35,
      width: 31,
      marginRight: browser.lessThan.small ? 0 : 12,
    },
    signUpButton: {
      height: 30,
      marginLeft: 15
    },
    gearsGuru: {
      flex: 1,
      fontFamily: "Good-Times",
      fontSize: browser.lessThan.small ? "0.8em" : "1.1em",
      textDecoration: "none"
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
    const { authedUser, browser } = this.props;
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
    let appBarStyle = {};
    appBarStyle.zIndex = transparent ? 0 : 1000;
    if (transparent) {
      appBarStyle.boxShadow = "none";
      appBarStyle.backgroundColor = "transparent";
    }

    return (
      <AppBar position="static" style={{ ...appBarStyle }}>
        <Toolbar disableGutters={browser.lessThan.small}>
          <Link
            to="/"
            style={style.link}
          >
            <Logo
              style={style.logo}
              fill="white"
              stroke="white"
            />
            <Typography
              variant="title"
              color="inherit"
              style={style.gearsGuru}
            >
              Gears Guru
            </Typography>
          </Link>
          {this.renderLogin(style)}
        </Toolbar>
      </AppBar>
    );
  }
}

export default connect(mapStateToProps)(MenuAppBar);
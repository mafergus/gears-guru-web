import React from 'react';
import MainPage from 'components/MainPage';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from 'react-helmet';
import DocumentTitle from 'react-document-title';

function mapStateToProps(state, props) {
  return {
    authedUser: state.authedUser,
  };
}

/**
 * Routes: https://github.com/reactjs/react-router/blob/master/docs/API.md#route
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > App
 */
class AppRoutes extends React.Component {
  render() {
    // const { authedUser } = this.props;
    // const hasUser = authedUser !== null;
    // const isAuthed = hasUser ? authedUser.hasOwnProperty('uid') : false;
    // const isMobile = state.browser.is.extraSmall;

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <DocumentTitle title="Gears Guru - Find the best car repair garages in Dubai!" />
        <Helmet>
          <meta name="description" content="Best Car and Auto Repair Services and Workshops Dubai" />
          <meta name="keywords" content="car repair, car repair dubai, car repair uae, auto repair, auto repair dubai, auto repair uae, car service, car service dubai, auto service, auto servicing dubai, car garage, car workshop, auto workshop" />
          <meta name="google-site-verification" content="Z5xfhCSfmT74Y2930wHGuxbb8ipy1lymqaS22U6jVCA" />
        </Helmet>
        <CssBaseline />
        {/*<Route exact path="/" component={isAuthed ? MainPage : LoginPage} />*/}
        <MainPage />
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppRoutes);
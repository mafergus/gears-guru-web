import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from 'react-helmet';
import DocumentTitle from 'react-document-title';

import LandingPage from 'components/landing/LandingPage';
import HomePage from 'components/home/HomePage';
import GaragePage from 'components/profile/GaragePage';
import MenuAppBar from 'components/MenuAppBar';
import AdminPage from 'components/admin/AdminPage';
import GarageAdmin from 'components/admin/GarageAdmin';
import SearchPage from 'components/search/SearchPage';
import { BookingPage } from 'pages';
import Footer from 'components/Footer';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: '/',
    main: LandingPage,
    exact: true,
    title: 'Landing',
    appBar: () => <MenuAppBar transparent />,
  },
  {
    path: '/home',
    main: HomePage,
    exact: true,
    title: 'Gears Guru',
    appBar: () => <MenuAppBar />,
  },
  {
    path: '/garage/:id',
    main: GaragePage,
    title: 'Garage',
    appBar: () => <MenuAppBar />,
  },
  {
    path: '/admin',
    exact: true,
    main: AdminPage,
    title: 'Admin',
    appBar: () => <MenuAppBar />,
  },
  {
    path: '/admin/garage/:id',
    main: GarageAdmin,
    title: 'Garage Admin',
    appBar: () => <MenuAppBar />,
  },
  {
    path: '/s/',
    main: SearchPage,
    title: 'Search',
    appBar: () => <MenuAppBar />,
  },
  {
    path: '/booking',
    main: BookingPage,
    title: 'Booking',
    appBar: () => <MenuAppBar />,
  },
];

function Routes() {
  return (
    <Router>
      <div style={{ width: "100%", height: "100%" }}>
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.appBar}
          />
        ))}
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
        <Footer />
      </div>
    </Router>
  );
};

const Main = () => (
  <div style={{ height: "100%", width: "100%" }}>
    <DocumentTitle title="Gears Guru - Find the best car repair garages in Dubai!" />
    <Helmet>
      <meta name="description" content="Best Car and Auto Repair Services and Workshops Dubai" />
      <meta name="keywords" content="car repair, car repair dubai, car repair uae, auto repair, auto repair dubai, auto repair uae, car service, car service dubai, auto service, auto servicing dubai, car garage, car workshop, auto workshop" />
      <meta name="google-site-verification" content="Z5xfhCSfmT74Y2930wHGuxbb8ipy1lymqaS22U6jVCA" />
    </Helmet>
    <CssBaseline />
    {/*<Route exact path="/" component={isAuthed ? MainPage : LoginPage} />*/}
    <Routes />
  </div>
)

export default withRouter(Main);
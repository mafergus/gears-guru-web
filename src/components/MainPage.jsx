import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from 'components/home/HomePage';
import GaragePage from 'components/profile/GaragePage';
import MenuAppBar from 'components/MenuAppBar';
import { primary } from 'util/colors';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: '/',
    exact: true,
    main: GaragePage,
    title: 'Home'
  },
  {
    path: '/garage/:id',
    main: GaragePage,
    title: 'Garage'
  }
];

const MainPage = () => (
  <Router>
    <div style={{ width: "100%", height: "100%" }}>
      {routes.map((route, index) => (
        // Render more <Route>s with the same paths as
        // above, but different components this time.
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={() => <MenuAppBar title={route.title} />}
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
    </div>
  </Router>
);

export default MainPage;
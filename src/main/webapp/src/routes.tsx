import React from 'react';
import {RouteComponentProps, Switch, useLocation} from 'react-router-dom';
import ErrorBoundaryRoute from './components/shared/error/error-boundary-route';
import PageNotFound from './components/shared/error/page-not-found';
import Directory from './components/module/directory/directory';
import {AUTHORITIES, CONFIG} from './config/constants';
import PrivateRoute from './components/shared/auth/private-route';
import Dashboard from './components/module/dashboard';
import LoginRedirect from './components/module/login/login-redirect';
import {Logout} from "./components/module/login/Logout";

/**
 *The LoginRedirect component always comes before the Dashboard component.
 * The order is very important, because the PrivateRoute component creates an infinite loop with the path "/"
 * of the Dashboard component and never looks at the path of the LoginRedirect component. You can define
 * the most specific Dashboard path as "/dashboard"
 * @constructor
 */
export default function AppRoute() {
  let location = useLocation<RouteComponentProps>();
  React.useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return (
    <Switch>
      <ErrorBoundaryRoute path='/logout' component={Logout} />
      <ErrorBoundaryRoute path='/' exact component={Directory} />
        {/*Read the explanation above the component*/}
      <ErrorBoundaryRoute path={CONFIG.LOGIN_URL} component={LoginRedirect} />
      <PrivateRoute path='/' hasAnyAuthorities={[AUTHORITIES.ADMIN]} component={Dashboard} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  );
}

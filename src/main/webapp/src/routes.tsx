import React from 'react';
import { useLocation, Switch, RouteComponentProps } from 'react-router-dom';
import ErrorBoundaryRoute from './components/shared/error/error-boundary-route';
import PageNotFound from './components/shared/error/page-not-found';
import Directory from './components/module/directory/directory';
import {AUTHORITIES, CONFIG} from './config/constants';
import PrivateRoute from './components/shared/auth/private-route';
import Home from './components/module/home/home';
import LoginRedirect from './components/module/login/login-redirect';
import {Logout} from "./components/module/login/Logout";

export default function AppRoute() {
  let location = useLocation<RouteComponentProps>();
  React.useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return (
    <Switch>
      <ErrorBoundaryRoute path='/logout' component={Logout} />
      <ErrorBoundaryRoute path='/' exact component={Directory} />
      <PrivateRoute path='/dashboard' hasAnyAuthorities={[AUTHORITIES.ADMIN]} component={Home} />
      <ErrorBoundaryRoute path={CONFIG.LOGIN_URL} component={LoginRedirect} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  );
}

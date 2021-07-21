import React from 'react';
import ErrorBoundary from '../error/error-boudary';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import {CONFIG} from "../../../config/constants";
import {useSelector} from "react-redux";
import {IRootState} from "../reducer";

interface IPrivateRouteProps extends RouteProps {
  hasAnyAuthorities?: string[];
}

const PrivateRoute = ({ component: Component, hasAnyAuthorities = [], ...rest }: IPrivateRouteProps) => {
  const {isAuthenticated, sessionHasBeenFetched, account } = useSelector((states: IRootState) => states.auth);

  if (!Component) throw new Error(`A component needs to be specified for private route for path ${(rest as any).path}`);

  const checkAuthorities = props =>
    hasAnyAuthority(account.authorities, hasAnyAuthorities) ? (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    ) : (
      <div className='insufficient-authority'>
        <div className='alert alert-danger'>
          <Typography variant='h4'>You are not authorized to access this page.</Typography>
        </div>
      </div>
    );

  const renderRedirect = props => {
      if (!sessionHasBeenFetched) {
          return <div></div>;
      }
      else {
          return isAuthenticated ? (
              checkAuthorities(props)
          ) : (
              <Redirect
                  to={{
                      pathname: CONFIG.LOGIN_URL,
                      search: props.location.search,
                      state: {from: props.location},
                  }}
              />
          );
      }
  };

  return <Route {...rest} render={renderRedirect} />;
};

export const hasAnyAuthority = (authorities: string[], hasAnyAuthorities: string[]) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some(auth => authorities.includes(auth));
  }
  return false;
};

export default PrivateRoute;

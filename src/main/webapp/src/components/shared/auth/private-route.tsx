import React from 'react';
import ErrorBoundary from '../error/error-boudary';
import {Link, Redirect, Route, RouteProps} from 'react-router-dom';
import {Button, Typography} from '@material-ui/core';
import {CONFIG} from "../../../config/constants";
import {useSelector} from "react-redux";
import {IRootState} from "../reducer";
import {useTranslation} from "react-i18next";

interface IPrivateRouteProps extends RouteProps {
    hasAnyAuthorities: string[];
}

const PrivateRoute = ({component: Component, hasAnyAuthorities = [], ...rest}: IPrivateRouteProps) => {
    const {t} = useTranslation()
    const account = useSelector((states: IRootState) => states.auth.account);
    const isAuthenticated = useSelector((states: IRootState) => states.auth.isAuthenticated);
    const sessionHasBeenFetched = useSelector((states: IRootState) => states.auth.sessionHasBeenFetched);

    if (!Component) throw new Error(`A component needs to be specified for private route for path ${(rest as any).path}`);

    const checkAuthorities = props =>
        hasAnyAuthority(account.authorities, hasAnyAuthorities) ? (
            <ErrorBoundary>
                <Component {...props} />
            </ErrorBoundary>
        ) : (<Typography variant='h4'>{t("common:unauthorized_page")}</Typography>);

    const renderRedirect = props => {
        if (!sessionHasBeenFetched) {
            return (
                <>
                    {`sessionHasBeenFetched ${sessionHasBeenFetched}`}
                    <Button component={Link} to="/" color="primary">
                        Back to Directory
                    </Button>
                </>
            )
        } else {
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

    return <Route {...rest} render={renderRedirect}/>;
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

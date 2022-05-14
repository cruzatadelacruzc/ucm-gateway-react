import React from 'react';
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {IRootState} from "../reducer";
import {Typography} from '@mui/material';
import {Navigate, useLocation} from 'react-router-dom';
import {CONFIG} from "../../../config/constants";
import ErrorBoundary from "../error/error-boudary";

interface IRequireAuthProps {
    children: JSX.Element;
    hasAnyAuthorities: string[];
}

const RequireAuth = ({children, hasAnyAuthorities = []}: IRequireAuthProps) => {
    const {t} = useTranslation()
    let location = useLocation();
    const account = useSelector((states: IRootState) => states.auth.account);
    const isAuthenticated = useSelector((states: IRootState) => states.auth.isAuthenticated);
    const sessionHasBeenFetched = useSelector((states: IRootState) => states.auth.sessionHasBeenFetched);
    const isAuthorized = hasAnyAuthority(account.authorities, hasAnyAuthorities);

    const checkAuthorities = () =>
        isAuthorized ? (
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
        ) : (<Typography variant='h4'>{t("common:unauthorized_page")}</Typography>);

        if (!sessionHasBeenFetched) {
            return <></>
        } else {
            return isAuthenticated ? (
                checkAuthorities()
            ) : (
                <Navigate
                    to={CONFIG.LOGIN_URL}
                    state={{ from: location }}
                    replace
                />
            );
        }
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

export default RequireAuth;

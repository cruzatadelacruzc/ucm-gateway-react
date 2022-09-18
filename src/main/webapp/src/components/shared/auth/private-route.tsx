import React from 'react';
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {IRootState} from "../reducer";
import {Typography} from '@mui/material';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {CONFIG} from "../../../config/constants";
import ErrorBoundary from "../error/error-boudary";
import Button from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Box from "@mui/material/Box";

interface IRequireAuthProps {
    children: JSX.Element;
    hasAnyAuthorities: string[];
}

const RequireAuth = ({children, hasAnyAuthorities = []}: IRequireAuthProps) => {
    const {t} = useTranslation(['error'])
    let location = useLocation();
    let navigate = useNavigate();
    const account = useSelector((states: IRootState) => states.auth.account);
    const isAuthenticated = useSelector((states: IRootState) => states.auth.isAuthenticated);
    const sessionHasBeenFetched = useSelector((states: IRootState) => states.auth.sessionHasBeenFetched);
    const isAuthorized = hasAnyAuthority(account.authorities, hasAnyAuthorities);

    const checkAuthorities = () =>
        isAuthorized ? (
            <ErrorBoundary>
                {children}
            </ErrorBoundary>
        ) : (<Typography variant='h4'>{t("unauthorized_page")}</Typography>);

        if (!sessionHasBeenFetched) {
            return <Box sx={{display: 'flex', alignItems: "center"}}>
                <Typography variant='h5' sx={{mr: 1}}>{t("noSession")}</Typography>
                <Button variant="text" onClick={() => navigate("/")}
                        startIcon={<KeyboardReturnIcon/>}>{t('common:back')}</Button>
            </Box>
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

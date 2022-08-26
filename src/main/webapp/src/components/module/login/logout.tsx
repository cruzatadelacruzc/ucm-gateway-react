import React, {useLayoutEffect} from "react";
import {logout} from "../../shared/reducer/authenticate";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../shared/reducer";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const Logout = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation(["common"])
    const logoutUrl = useSelector((states: IRootState) => states.auth.logoutUrl);

    useLayoutEffect(() => {
        dispatch(logout());
        if (logoutUrl) {
            window.location.href = logoutUrl
        }
    }, [logoutUrl]) // eslint-disable-line react-hooks/exhaustive-deps

    return (<Typography variant="caption">{t("logout_ok")}</Typography>);
}

export default Logout
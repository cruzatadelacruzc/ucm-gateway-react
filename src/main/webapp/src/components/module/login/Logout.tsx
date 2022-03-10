import React, {useLayoutEffect} from "react";
import {logout} from "../../shared/reducer/authenticate";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../shared/reducer";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const Logout = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation(["common"])
    const { auth } = useSelector((states: IRootState) => states);

    useLayoutEffect(() => {
        dispatch(logout());
        if(auth.logoutUrl) {
            window.location.href = auth.logoutUrl+ '?redirect_uri=' + window.location.origin
        }
    },[auth.logoutUrl, dispatch])

    return (
        <Typography variant="caption">{t("logout_ok")}</Typography>
    );
}

export default Logout
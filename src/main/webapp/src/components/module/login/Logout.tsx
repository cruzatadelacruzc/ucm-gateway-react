import React, {useContext, useLayoutEffect} from "react";
import {AppContext} from "../../../config/context";
import {logout} from "../../shared/reducer/authenticate";

export const Logout = () => {
    const { states: {authentication}, dispatch } = useContext(AppContext);
    useLayoutEffect(() => {
        logout()(dispatch);
        const logoutUrl = authentication.logoutUrl;
        if(logoutUrl) {
            window.location.href = logoutUrl+ '?redirect_uri=' + window.location.origin
        }
    })

    return (
        <div className="p-5">
            <h4>Logged out successfully!</h4>
        </div>
    );
}
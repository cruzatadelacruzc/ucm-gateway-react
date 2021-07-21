import React, {useLayoutEffect} from "react";
import {logout} from "../../shared/reducer/authenticate";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../shared/reducer";

export const Logout = () => {
    const { logoutUrl } = useSelector((states: IRootState) => states.auth);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(logout());
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
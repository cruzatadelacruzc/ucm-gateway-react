import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {REDIRECT_URL} from '../../shared/util/url-util';
import {isObjectWithKey} from "../../shared/util/function-utils";

export const LoginRedirect = () => {
    const { state } = useLocation()
    const from = isObjectWithKey(state, 'from') &&
        isObjectWithKey(state.from, 'pathname') &&
        typeof state.from.pathname === 'string'
        ? state.from.pathname
        : "/"
    useEffect(() => {
        window.sessionStorage.setItem(REDIRECT_URL, from);
        window.location.reload();
    });
    return null;
};

export default LoginRedirect;

import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {REDIRECT_URL} from '../../shared/util/url-util';

export const LoginRedirect = () => {
    let location = useLocation();
    useEffect(() => {
        localStorage.setItem(REDIRECT_URL, location.pathname);
        window.location.reload();
    });
    return null;
};

export default LoginRedirect;

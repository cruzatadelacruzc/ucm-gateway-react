import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {REDIRECT_URL} from '../../shared/util/url-util';

export const LoginRedirect = () => {
    let location = useLocation<{ from: { pathname: string } }>();
    useEffect(() => {
        localStorage.setItem(REDIRECT_URL, location.state.from.pathname);
        window.location.reload();
    });
    return null;
};

export default LoginRedirect;

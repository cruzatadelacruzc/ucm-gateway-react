import { useEffect } from 'react';
import { useLocation, RouteComponentProps } from 'react-router-dom';
import { REDIRECT_URL } from '../../shared/util/url-util';

export const LoginRedirect = () => {
  let location = useLocation<RouteComponentProps>();
  useEffect(() => {
    localStorage.setItem(REDIRECT_URL, location.pathname);
    window.location.reload();
  });
  return null;
};

export default LoginRedirect;

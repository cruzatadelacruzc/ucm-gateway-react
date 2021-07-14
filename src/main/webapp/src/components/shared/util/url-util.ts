import {CONFIG} from "../../../config/constants";
export const getLoginUrl = () => {
  const port = window.location.port ? `:${window.location.port}` : '';

  // If you have configured multiple OIDC providers, then, you can update this URL to /login.
  // It will show a Spring Security generated login page with links to configured OIDC providers.
  return `//${window.location.hostname}${port}${window.location.pathname}${CONFIG.LOGIN_URL.slice(1)}`;
};
export const REDIRECT_URL = 'redirectURL';

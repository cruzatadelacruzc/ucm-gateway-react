// https://create-react-app.dev/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
// https://github.com/chimurai/http-proxy-middleware
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    [
        '/api',
        '/oauth2',
        '/login',
        '/services'
    ],
      createProxyMiddleware({
      target: 'http://localhost:8080',
      secure: false,
      changeOrigin: true,
      xfwd: true,
    })
  );
};
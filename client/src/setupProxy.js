const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api","/api/images", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
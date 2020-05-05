const routes = (module.exports = require("next-routes")());

routes
  .add("portfolioNew", "/portfolios/new")
  .add("portfolio", "/portfolio/:id")
  .add("portfolioedit", "/portfolio/:id/edit")
  .add("userBlogs", "/blogs/dashboard")
  .add("blogEditor", "/blogs/new")
  .add("blogDetail", "/blogs/:slug")
  .add("blogeditorupdate", "/blogs/:id/edit")
  .add("about", "/about")
  .add("test", "/test/:id");

//we can use Link for dynamic routes

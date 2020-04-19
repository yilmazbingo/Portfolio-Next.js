const routes = (module.exports = require("next-routes")());

routes
  .add("portfolioNew", "/portfolios/new")
  .add("portfolio", "/portfolio/:id")
  .add("portfolioedit", "/portfolio/:id/edit")
  .add("userBlogs", "/blogs/dashboard")
  .add("blogEditor", "/blogs/new")
  .add("blogDetail", "/blogs/:slug")
  .add("blogEditorUpdate", "/blogs/:id/edit")
  .add("about", "/about");

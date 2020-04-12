const server = require("express")();
// const { parse } = require("url");
const next = require("next");
const routes = require("./routes");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
// const handle = app.getRequestHandler(); //this is built in next route handler
const handle = routes.getRequestHandler(app);
// console.log("appp", app);
app
  .prepare()
  .then(() => {
    server.get("*", (req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      // const parsedUrl = parse(req.url, true);
      // const { pathname, query } = parsedUrl;

      // if (pathname === "/a") {
      //   app.render(req, res, "/b", query);
      // } else if (pathname === "/b") {
      //   app.render(req, res, "/a", query);
      // } else {
      //   handle(req, res, parsedUrl);
      // }

      return handle(req, res);
    });
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

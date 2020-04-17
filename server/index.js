const server = require("express")();
// const { parse } = require("url");
const next = require("next");
const routes = require("../routes");
const authService = require("./services/auth");
const mongoose = require("mongoose");
const config = require("./config/index");
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
// const handle = app.getRequestHandler(); //this is built in next route handler
const handle = routes.getRequestHandler(app);

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.log("Cannot connect to the database"), process.exit(1);
  })
  .then(() => console.log("mongodb is up and running"));

app
  .prepare()
  .then(() => {
    server.get("/api/v1/secret", authService.checkJwt, (req, res) => {
      res.send("I am secretdata from getinitial props");
    });

    server.use(bodyParser.json());
    server.use("/api/v1/books", require("./routes/book"));
    server.use("/api/v1/portfolios", require("./routes/portfolio"));

    server.get(
      "/api/v1/siteowner",
      authService.checkJwt,
      authService.checkRole("siteOwner"),
      (req, res) => {
        console.log("req.user:", req.user);
        return res.send("this is only for admin");
      }
    );

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
    server.use(function (err, req, res, next) {
      if (err.name === "UnauthorizedError") {
        res
          .status(401)
          .send({ title: "Unauthorized", detail: "Unauthorized Access!" });
      }
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

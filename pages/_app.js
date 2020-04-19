import React from "react";
import App from "next/app";
import auth0 from "../services/auth0";
//main.scss will over write bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";

const namespace = "http://localhost:3000";
export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    // console.log("ctx", ctx.req.headers);
    let pageProps = {};

    const user = process.browser
      ? await auth0.clientAuth()
      : await auth0.serverAuth(ctx.req);

    const isSiteOwner = user && user[namespace + "/roles"] === "siteOwner";

    //this will be sent to all the components
    const auth = { user, isAuthenticated: !!user, isSiteOwner };

    //this makes sure that server finishes async coding before shipping everything to client
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, auth };
  }

  render() {
    const { Component, pageProps, auth } = this.props;
    return <Component {...pageProps} auth={auth} />;
  }
}

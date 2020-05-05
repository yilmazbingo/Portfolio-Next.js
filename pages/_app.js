import React from "react";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import auth0 from "../services/auth0";
import withRedux from "next-redux-wrapper";
import makeStore from "../redux/index";
import { ToastContainer, toast } from "react-toastify";
//main.scss will over write bootstrap
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";

const namespace = "http://localhost:3000";
export default withRedux(makeStore, { debug: true })(
  class MyApp extends App {
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
      const { Component, pageProps, auth, store } = this.props;
      return (
        <Provider store={store}>
          <ToastContainer />
          <Component {...pageProps} auth={auth} />
        </Provider>
      );
    }
  }
);

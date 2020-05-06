import React from "react";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import auth0 from "../services/auth0";
import initializeStore from "../redux/index";
import { withRouter } from "next/router";
import { authSuccess } from "../redux/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
//main.scss will over write bootstrap-------------------CSS---------------------
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../styles/main.scss";

//-------------------------REDUX-SETUP-------------------------------
const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState || {});
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }

  return window[__NEXT_REDUX_STORE__];
}

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    // console.log("ctx", ctx.req.headers);
    let pageProps = {};

    const reduxStore = getOrCreateStore();

    const user = process.browser
      ? await auth0.clientAuth()
      : await auth0.serverAuth(ctx.req);

    if (user) {
      reduxStore.dispatch(authSuccess(user));
      ctx.user = user;
    }
    // Provide the store to getInitialProps of pages
    ctx.reduxStore = reduxStore;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, initialReduxState: reduxStore.getState() };
  }

  constructor(props) {
    super(props);

    this.reduxStore = getOrCreateStore(props.initialReduxState);
  }

  async componentDidMount() {
    if (this.props.router.pathname === "/callback") return;
  }

  render() {
    const { Component, pageProps, initialReduxState } = this.props;
    return (
      <Provider store={this.reduxStore}>
        <ToastContainer />
        <Component {...pageProps} initialReduxState={initialReduxState} />
      </Provider>
    );
  }
}

export default withRouter(MyApp);

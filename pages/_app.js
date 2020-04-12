import React from "react";
import App from "next/app";

// Stylings
//main.scss will over write bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    //this makes sure that server finishes async coding before shipping everything to client
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

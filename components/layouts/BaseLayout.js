import React from "react";
import Header from "../shared/Header";
import Head from "next/head";

const BaseLayout = (props) => {
  const { children, isAuthenticated, className, user } = props;
  const headerType = props.headerType || "default";
  return (
    <React.Fragment>
      <Head>
        <title>Yilmaz Bingol</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&subset=latin-ext"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <script
          src="https://kit.fontawesome.com/947d0dc7e4.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="layout-container">
        {headerType === "index" && (
          <Header
            className={`port-nav-${headerType}`}
            isAuthenticated={isAuthenticated}
            user={user}
          />
        )}
        {headerType === "default" && (
          <Header
            className={`port-nav-${headerType}`}
            isAuthenticated={isAuthenticated}
            user={user}
          />
        )}
        <main className={`cover ${className}`}>
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </React.Fragment>
  );
};

BaseLayout.defaultProps = {
  className: "",
};
export default BaseLayout;

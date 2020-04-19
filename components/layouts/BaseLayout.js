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
        <script
          src="https://kit.fontawesome.com/947d0dc7e4.js"
          crossorigin="anonymous"
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

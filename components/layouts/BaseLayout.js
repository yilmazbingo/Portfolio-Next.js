import React from "react";
import Header from "../shared/Header";

const BaseLayout = (props) => {
  const className = props.className || "";
  return (
    <div className="layout-container">
      <Header />

      <main className={`cover ${className}`}>
        <div className="wrapper">{props.children}</div>
      </main>
    </div>
  );
};

BaseLayout.defaultProps = {
  className: "",
};
export default BaseLayout;

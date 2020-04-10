import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import "../styles/main.scss";

class Index extends React.Component {
  static getInitialProps() {
    console.log("yilmaz");
    return {};
  }
  render() {
    return (
      <BaseLayout>
        <h1 className="index">Index</h1>
      </BaseLayout>
    );
  }
}

export default Index;

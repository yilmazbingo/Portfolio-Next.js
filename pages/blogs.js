import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

const blogs = (props) => {
  return (
    <BaseLayout {...props.auth}>
      <BasePage>
        <h1>blogs</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default blogs;

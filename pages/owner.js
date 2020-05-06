import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";

const Owner = (props) => {
  return (
    <BaseLayout>
      <BasePage>
        <h1>I am owner of this site</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth("siteOwner")(Owner);

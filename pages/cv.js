import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

const Cv = (props) => {
  return (
    <BaseLayout {...props.auth} title="Yilmaz Bingol-cv-">
      <BasePage>
        <h1>cv</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default Cv;

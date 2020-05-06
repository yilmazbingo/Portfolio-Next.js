import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

const Cv = (props) => {
  console.log("props in cv", props);
  return (
    <BaseLayout title="Yilmaz Bingol-cv-">
      <BasePage>
        <h1>cv</h1>
      </BasePage>
    </BaseLayout>
  );
};

Cv.getInitialProps = async (context) => {
  console.log("context in cv", context);
  return { props: { bir: 33 } };
};

export default Cv;

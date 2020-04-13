import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

const About = (props) => {
  return (
    <BaseLayout {...props.auth}>
      <BasePage>
        <h1>about</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default About;

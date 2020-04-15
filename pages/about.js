import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

const About = (props) => {
  return (
    <BaseLayout {...props.auth}>
      <BasePage title="I am about" className="about-page"></BasePage>
    </BaseLayout>
  );
};

export default About;

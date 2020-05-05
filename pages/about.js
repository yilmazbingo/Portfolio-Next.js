import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { Row, Col } from "reactstrap";
const About = (props) => {
  return (
    <BaseLayout {...props.auth} title=" learn About Yilmaz Bingol">
      <BasePage className="about-page">
        <Row className="mt-5">
          <Col md="6">
            <div className="left-side">
              <h1 className="title fadein">Hello, Welcome</h1>
              <h4 className="subtitle fadein">To About Page</h4>
              <p className="subsubTitle fadein">
                Feel free to read short description about me.
              </p>
            </div>
          </Col>
          <Col md="6">
            <div className="fadein">
              <p>
                My name is Yilmaz Bingol and I am an experienced software
                engineer and freelance developer.{" "}
              </p>
              <p>
                I have a Master's degree in Global Business and FInance and
                several years of experience working on a wide range of
                technologies and projects.
              </p>
              <p>
                Throughout my career, I have acquired advanced technical
                knowledge and the ability to explain programming topics clearly
                and in detail to a broad audience.
              </p>
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default About;

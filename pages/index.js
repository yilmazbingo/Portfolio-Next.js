import React, { useState, useEffect } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import { Button, Container, Row, Col } from "reactstrap";
import TypedAnimation from "../components/TypedAnimation";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlipping: false,
    };
  }

  componentDidMount() {
    this.animateCard();
  }

  componentWillUnmount() {
    this.cardAnimationInterval && clearInterval(this.cardAnimationInterval);
  }

  animateCard() {
    this.cardAnimationInterval = setInterval(() => {
      this.setState({
        isFlipping: !this.state.isFlipping,
      });
    }, 400000);
  }

  render() {
    const { isFlipping } = this.state;

    return (
      <BaseLayout
        className={`cover ${isFlipping ? "cover-1" : "cover-0"}`}
        {...this.props.auth}
        headerType="index"
        title="Yilmaz Bingol-Portfolio-Blogs"
      >
        <div className="main-section">
          <div className="background-image">
            <img src="/images/background-index.png" />
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? "isFlipping" : ""}`}>
                    <div className="front">
                      <div className="hero-section-content">
                        <h2> SOFTWARE ENGINEER </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img
                        alt="Guy programming welcome picture"
                        className="image"
                        src="/images/coding.jpeg"
                      />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Get Your Projects Done </h2>
                        <div className="hero-section-content-intro">
                          Profesional and top quality service in web
                          development.
                        </div>
                      </div>
                      <img
                        alt="Guy programming welcome picture"
                        className="image"
                        src="/images/original.png"
                      />

                      <div className="shadow-custom shadow-custom-2">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    Welcome to the portfolio website of . Get informed,
                    collaborate and discover projects I was working on through
                    the years!
                  </h1>
                </div>

                <TypedAnimation />

                <div className="hero-welcome-bio">
                  <h2>Let's take a look on my work.</h2>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    );
  }
}

export default Index;

// {isAuthenticated && (
//   <span>
//     {" "}
//     <b> {user.name} </b>{" "}
//   </span>
// )}

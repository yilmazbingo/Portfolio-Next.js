import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import Link from "next/link";
import axios from "axios";
import BasePage from "../components/BasePage";
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";

class Portfolio extends React.Component {
  static async getInitialProps(context) {
    let posts = [];
    // console.log("context", context);
    try {
      posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
    } catch (e) {
      console.log(e);
    }
    return {
      posts: posts.data.splice(0, 10), // will be passed to the page component as props
    };
  }

  renderPosts(posts) {
    return posts.map((post, index) => {
      return (
        <Col md="4" key={index}>
          <React.Fragment>
            <span>
              <Card className="portfolio-card">
                <CardHeader className="portfolio-card-header">
                  Some Position {index}
                </CardHeader>
                <CardBody>
                  <p className="portfolio-card-city"> Some Location {index} </p>
                  <CardTitle className="portfolio-card-title">
                    Some Company {index}
                  </CardTitle>
                  <CardText className="portfolio-card-text">
                    Some Description {index}
                  </CardText>
                  <div className="readMore"> </div>
                </CardBody>
              </Card>
            </span>
          </React.Fragment>
        </Col>
      );
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage title="I am portfolio" className="portfolio-page">
          <Row> {this.renderPosts(posts)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolio;

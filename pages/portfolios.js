import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import Link from "next/link";
import { getPortfolios } from "../actions";
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
    let portfolios = [];
    try {
      portfolios = await getPortfolios(context.req);
    } catch (e) {
      console.log(e);
    }
    return {
      portfolios,
    };
  }

  renderPortfolios(portfolios) {
    return portfolios.map((portfolio, index) => {
      const {
        title,
        company,
        location,
        position,
        description,
        startDate,
      } = portfolio;
      return (
        <Col md="4" key={index}>
          <React.Fragment>
            <span>
              <Card className="portfolio-card">
                <CardHeader className="portfolio-card-header">
                  Position :{position}
                </CardHeader>
                <CardBody>
                  <p className="portfolio-card-city"> Location {location} </p>
                  <CardTitle className="portfolio-card-title">
                    Company {company}
                  </CardTitle>
                  <CardText className="portfolio-card-text">
                    Description {description}
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
    const { portfolios } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage title="I am portfolio" className="portfolio-page">
          <Row> {this.renderPortfolios(portfolios)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolio;

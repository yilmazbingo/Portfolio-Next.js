import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import PortfolioForm from "../components/portfolios/portfolioCreateForm";
import { Row, Col } from "reactstrap";

const PortfolioCreate = (props) => {
  return (
    <BaseLayout {...props.auth}>
      <BasePage title="I am Portfoliocreate" className="portfolio-create-page">
        <Row>
          <Col md="6">
            <PortfolioForm></PortfolioForm>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth("siteOwner")(PortfolioCreate);

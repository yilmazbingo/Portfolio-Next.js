import React, { useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import PortfolioForm from "../components/portfolios/portfolioCreateForm";
import { Row, Col } from "reactstrap";

import { updatePortfolio, getPortfolioById } from "../actions";

import withAuth from "../components/hoc/withAuth";
import { Router } from "../routes";

const PortfolioEdit = (props) => {
  const [error, setError] = useState("");

  const onUpdatePortfolio = (portfolioData, { setSubmitting }) => {
    setSubmitting(true);

    updatePortfolio(portfolioData)
      .then((portfolio) => {
        setSubmitting(false);
        setError(undefined);
        Router.pushRoute("/portfolios");
      })
      .catch((err) => {
        const error = err.message || "Server Error";
        setSubmitting(false);
        setError(error);
      });
  };

  const { portfolio } = props;
  return (
    <BaseLayout {...props.auth}>
      <BasePage className="portfolio-create-page" title="Update Portfolio">
        <Row>
          <Col md="6">
            <PortfolioForm
              initialValues={portfolio}
              error={error}
              onSubmit={onUpdatePortfolio}
            />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

PortfolioEdit.getInitialProps = async ({ query }) => {
  let portfolio = {};
  try {
    portfolio = await getPortfolioById(query.id);
  } catch (error) {
    console.log(error);
  }
  return { portfolio: portfolio };
};

export default PortfolioEdit;

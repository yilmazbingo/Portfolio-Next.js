import React, { useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import PortfolioForm from "../components/portfolios/portfolioCreateForm";
import { Row, Col } from "reactstrap";
import { createPortfolio } from "../actions/index";
import { Routes } from "../routes";
import moment from "moment";

const INITIAL_VALUES = {
  title: "",
  company: "",
  location: "",
  position: "",
  description: "",
  startDate: moment(),
  endDate: memont(),
};

const PortfolioCreate = (props) => {
  const [error, setError] = useState("");
  const savePortfolio = async (portfolioData, { setSubmitting }) => {
    setSubmitting(true);
    try {
      await createPortfolio(portfolioData);
      setSubmitting(false);
      setError(undefined);
      Routes.pushRoute("/portfolios");
    } catch (e) {
      const error = e.message || "Server Error";
      setSubmitting(false);
      setError(error);
    }
  };
  return (
    <BaseLayout {...props.auth}>
      <BasePage title="I am Portfoliocreate" className="portfolio-create-page">
        <Row>
          <Col md="6">
            <PortfolioForm
              initialValues={INITIAL_VALUES}
              error={error}
              onSubmit={savePortfolio}
            ></PortfolioForm>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth("siteOwner")(PortfolioCreate);

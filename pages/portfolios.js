import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import Link from "next/link";
import { getPortfolios, deletePortfolio } from "../actions";
import { Router } from "../routes";
import BasePage from "../components/BasePage";
import { Col, Button, Row } from "reactstrap";
import PortfolioCard from "../components/portfolios/PortfolioCard";

const Portfolio = (props) => {
  console.log("porps in portfolios", props);
  const {
    portfolios,
    auth: { isAuthenticated, isSiteOwner },
  } = props;

  const navigateToEdit = (portfolioId, e) => {
    e.stopPropagation();
    Router.pushRoute(`/portfolio/${portfolioId}/edit`);
  };
  const displayDeleteWarning = (portfolioId) => {
    const isConfirm = confirm("are tou sure you want to delete the portfolio");
    if (isConfirm) {
      onDeletePortfolio(portfolioId);
    }
  };

  //we have to update it inorder to see the result so best way is to redirect
  const onDeletePortfolio = (portfolioId) => {
    deletePortfolio(portfolioId)
      .then(() => {
        Router.pushRoute("/portfolios");
      })
      .catch((err) => console.log(err.message));
  };

  const renderPortfolios = (portfolios) => {
    return portfolios.map((portfolio, index) => {
      return (
        <Col md="4" key={index}>
          <PortfolioCard portfolio={portfolio}>
            {isAuthenticated && isSiteOwner && (
              <React.Fragment>
                <Button
                  onClick={(e) => navigateToEdit(portfolio._id, e)}
                  color="warning"
                >
                  Edit
                </Button>{" "}
                <Button
                  onClick={(e) => displayDeleteWarning(portfolio._id, e)}
                  color="danger"
                >
                  Delete
                </Button>
              </React.Fragment>
            )}
          </PortfolioCard>
        </Col>
      );
    });
  };
  return (
    <BaseLayout {...props.auth} title="Yilmaz Bingol portfolios-">
      <BasePage title="I am portfolio" className="portfolio-page">
        {isAuthenticated && (
          <Button
            onClick={() => Router.pushRoute("/portfoliocreate")}
            size="lg"
            color="success"
            className="create-port-btn"
          >
            Create Portfolio
          </Button>
        )}
        <Row> {renderPortfolios(portfolios)}</Row>
      </BasePage>
    </BaseLayout>
  );
};

Portfolio.getInitialProps = async (context) => {
  let portfolios = [];
  try {
    portfolios = await getPortfolios(context.req);
  } catch (e) {
    console.log(e);
  }
  return {
    portfolios,
  };
};

export default Portfolio;

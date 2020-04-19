import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import PortfolioCardDetails from "./PortfolioCardDetails";

const PortfolioCard = (props) => {
  const [isOpen, setOpen] = useState(false);
  const { portfolio, children } = props;

  return (
    <span onClick={() => setOpen(true)}>
      <PortfolioCardDetails
        toggle={() => setOpen(!isOpen)}
        portfolio={portfolio}
        isOpen={isOpen}
      />

      <Card className="portfolio-card">
        <CardHeader className="portfolio-card-header">
          {portfolio.position}
        </CardHeader>
        <CardBody>
          <p className="portfolio-card-city">{portfolio.location}</p>
          <CardTitle className="portfolio-card-title">
            {portfolio.title}
          </CardTitle>
          <CardText className="portfolio-card-text">
            {portfolio.description}
          </CardText>
          <div className="readMore">{children}</div>
        </CardBody>
      </Card>
    </span>
  );
};

export default PortfolioCard;

//  extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       isOpen: false
//     };

//     this.handleToggle = this.handleToggle.bind(this);
//   }

//   handleToggle() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }

//   render() {
//     const { portfolio, children } = this.props;
//     const { isOpen } = this.state;

//     return (

//     )
//   }
// }

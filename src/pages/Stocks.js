import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import StocksList from "../components/StocksList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Stocks = () => {
  return (
    <>
      <Navigation />
      <Container className="mt-4">
        <h1>Stocks (Nasdaq-100)</h1>
        <Row>
          <Col>
            <StocksList />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Stocks;

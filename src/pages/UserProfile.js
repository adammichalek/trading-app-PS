import React from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Container from "react-bootstrap/Container";
import UserInfo from "../components/UserInfo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UserProfile = () => {
  return (
    <>
      <Navigation />
      <Container className="mt-4">
        <Row>
          <Col>
            <UserInfo />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default UserProfile;

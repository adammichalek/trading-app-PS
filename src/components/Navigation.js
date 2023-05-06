import Container from "react-bootstrap/Container";
import {Nav, Navbar, Button} from "react-bootstrap";
import { NavbarUserProfile } from "./NavbarUserProfile";
import { Link } from "react-router-dom";
import { useAuthValue } from "../authentication/Auth";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase-config";

export default function Navigation() {
  const { currentUser } = useAuthValue();
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" title="Home">
            Trading app
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" title="Home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/stocks" title="Stocks">
                Stocks
              </Nav.Link>
            </Nav>
            <Nav className="justify-content-end gap-3">
              {currentUser ? (
                <>
                  <NavbarUserProfile name={currentUser.email} />
                  <Button onClick={() => signOut(auth)}>Sign out</Button>
                </>
              ) : (
                <>
                  <Button variant="light" as={Link} to="/Login">
                    Sign In
                  </Button>
                  <Button as={Link} to="/SignUp">
                    Sign Up
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

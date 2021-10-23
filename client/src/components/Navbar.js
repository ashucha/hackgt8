import React from "react";

// Libraries
import {
  Button,
  Container,
  Navbar as BSNavbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <BSNavbar expand="lg">
      <Container>
        <BSNavbar.Brand>Name</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex">
            <Nav.Item>
              <Nav.Link as={Link} to="/login">
                Log In
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

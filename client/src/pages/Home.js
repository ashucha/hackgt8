import { Button } from "bootstrap";
import React from "react";

// Libraries
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container id="hero">
      <div id="hero-center">
        <h1 id="hero-title">Home</h1>
        <Link className="btn btn-danger btn-lg" to="/app">
          Let's Go!
        </Link>
      </div>
    </Container>
  );
}

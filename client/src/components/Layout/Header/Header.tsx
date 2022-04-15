import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const Header: React.FC<{}> = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <NavLink to="/list" className="navbar-brand">Qaiware</NavLink>
        <Nav className="me-auto">
          <NavLink to="/list" className="nav-link">List cars</NavLink>
          <NavLink to="/add" className="nav-link">Add car</NavLink>
        </Nav>
      </Container>
    </Navbar >
  );
};

export { Header };

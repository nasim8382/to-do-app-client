import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomLink from "../CustomLink/CustomLink";
import './Header.css';

const Header = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="addtask">
           <h2>To Do App</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <CustomLink className="me-3 nav-link-item" to="addtask">Add Task</CustomLink>
              <CustomLink className="me-3 nav-link-item" to="alltasks">All Tasks</CustomLink>
              <CustomLink className="me-3 nav-link-item" to="signup">Sign Up</CustomLink>
              <CustomLink className="me-3 nav-link-item" to="login">Sign In</CustomLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;

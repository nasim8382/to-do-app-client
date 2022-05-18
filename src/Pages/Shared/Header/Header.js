import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomLink from "../CustomLink/CustomLink";
import './Header.css';
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth);
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="addtask">
           <h2 className="semi-bold">To Do App</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <CustomLink className="me-3 nav-link-item" to="addtask">Add Task</CustomLink>
              <CustomLink className="me-3 nav-link-item" to="alltasks">All Tasks</CustomLink>
              <CustomLink className="me-3 nav-link-item" to="signup">Sign Up</CustomLink>
              {
                  user ?
                  <button className="btn text-white sign-out-btn" onClick={handleSignOut}> Sign Out</button> :
                  <CustomLink className="me-3 nav-link-item" to="login">Sign In</CustomLink>
                }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;

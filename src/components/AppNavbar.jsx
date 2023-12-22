import React from "react";
import Button from "react-bootstrap/Button";
import {
  Container,
  Nav,
  Navbar,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { clearSessions } from "../helper/SessionHelper";
const AppNavbar = () => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-dark-subtle"
        data-bs-theme="dark"
      >
        <Container className="my-2 my-lg-0">
          <NavLink to={"/"} className="navbar-brand">
            Work Manager
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto justify-content-center flex-grow-1">
              <NavLink className="nav-link" to="/task">
                New Task
              </NavLink>
              <NavLink className="nav-link" to="/allTask">
                All Task
              </NavLink>
            </Nav>
            <Form className="d-flex align-items-center">
              <InputGroup className="me-2">
                <FormControl type="text" placeholder="Search" />
                <Button variant="primary">Search</Button>
              </InputGroup>
              <Button onClick={clearSessions} variant="danger">
                Logout
              </Button>
              <BiUserCircle className="navBarUserIcon" onClick={()=>window.location.href="/profile"}></BiUserCircle>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;

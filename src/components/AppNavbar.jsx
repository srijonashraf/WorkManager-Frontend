import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { clearSessions } from "../helper/SessionHelper";
import { NavLink } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Dropdown from "react-bootstrap/Dropdown";
import { CiLogout } from "react-icons/ci";
import { GetProfileDetails } from "../apiRequest/apiRequest";
import {AiOutlineCheckCircle, AiOutlineEdit, AiOutlineLogout, AiOutlineMenuUnfold, AiOutlineUser} from "react-icons/ai";

const AppNavbar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [firstName, setFirstName] = useState("");

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetProfileDetails();
        setFirstName(res.data.data[0].firstName);
      } catch (error) {
        // Handle error if necessary
        console.error(error);
      }
    };

    // Call the async function to fetch data
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className={`app-container ${showOffcanvas ? "offcanvas-open" : ""}`}>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-dark-subtle"
        data-bs-theme="dark"
      >
        <Container className="my-2 my-lg-0  d-flex justify-content-between">
          <div className="NavBrand d-flex align-items-center">
            <RiMenuUnfoldFill
              className="text-warning mx-2 cursorPointer fs-5"
              onClick={toggleOffcanvas}
            />
            <NavLink to={"/"} className="navbar-brand">
              Work Manager
            </NavLink>
          </div>

          <Dropdown className="user-dropdown">
            <Dropdown.Toggle
              as={BiUserCircle}
              id="dropdown-basic"
              className="navBarUserIcon border-0 "
            >
              <BiUserCircle className="icon-nav-img" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="user-dropdown-content">
              <div className="mt-4 text-center">
                <BiUserCircle className="icon-nav-img" />
                <h6>{firstName}</h6>
                <Dropdown.Divider />
              </div>

              <Dropdown.Item
                className="d-flex align-items-center gap-1"
                href="/profile"
              >
                <IoSettingsOutline /> Setting
              </Dropdown.Item>
              <Dropdown.Item
                className="d-flex align-items-center gap-1"
                onClick={clearSessions}
              >
                <CiLogout /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={closeOffcanvas} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Work Manager</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-group list-group-flush list-unstyled">
            <li>
              <NavLink
                to="/"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/task"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                New Task
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allTask"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                All Task
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pending"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Pending
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/inProgress"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                In Progress
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/done"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Done
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cancelled"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Cancelled
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Settings
              </NavLink>
            </li>
            <Button
              onClick={clearSessions}
              className="d-flex rounded-1"
              variant="danger"
            >
              Logout
            </Button>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AppNavbar;

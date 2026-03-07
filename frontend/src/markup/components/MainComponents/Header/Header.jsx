// import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../assets/images/custom/logo.png";
import { useAuth } from "../../../../context/Auth";
import loginService from "../../../pages/servicesAPI/login.service";
import { useState } from "react";

export default function Header() {
  const { isLogged, setIsLogged, employee } = useAuth();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const [isOpen, setIsOpen] = useState(false);

  // Close navbar when a link is clicked
  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Toggle navbar function
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Logout function
  const logOut = () => {
    //set the logout function from login service
    loginService.logOut();
    //set isLogged to false
    setIsLogged(false);
    // Close navbar on logout
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`main-header header-style-one ${isAdmin ? "admin-header" : ""}`}
      >
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="text">
                  Enjoy the moment while we fix your car
                </div>
                <div className="office-hour">
                  Monday - Saturday 7:00AM - 6:00PM
                </div>
              </div>
              <div className="right-column">
                {isLogged ? (
                  <div className="link-btn">
                    <div className="phone-number">
                      <strong>Welcome, {employee?.employee_first_name}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="phone-number">
                    Schedule Your Appontment Today :
                    <strong>+251 929 075 365</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Navbar
          expand="lg"
          className="header-upper"
          expanded={isOpen}
          onToggle={handleToggle}
        >
          <Container>
            <div className="logo-box">
              <div className="logo">
                <Link to="/" onClick={handleNavClick}>
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  as={Link}
                  to="/"
                  className="black-link"
                  onClick={handleNavClick}
                >
                  HOME
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/about"
                  className="black-link"
                  onClick={handleNavClick}
                >
                  ABOUT US
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/services"
                  className="black-link"
                  onClick={handleNavClick}
                >
                  SERVICES
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/contact"
                  className="black-link"
                  onClick={handleNavClick}
                >
                  CONTACT US
                </Nav.Link>
                {isLogged && (
                  <Nav.Link
                    as={Link}
                    to="/admin"
                    className="black-link admin-panel desktop-admin-link"
                    onClick={handleNavClick}
                  >
                    ADMIN
                  </Nav.Link>
                )}
                {/* Always show ADMIN link in mobile navbar */}
                {isLogged && (
                  <Nav.Link
                    as={Link}
                    to="/admin"
                    className="black-link admin-panel mobile-admin-link"
                    style={{ display: "none" }}
                    onClick={handleNavClick}
                  >
                    ADMIN
                  </Nav.Link>
                )}
                <span className="nav-separator">|</span>
                {isLogged && (
                  <Nav.Link
                    as={Link}
                    to="/"
                    className="theme-btn btn-style-one logout-btn mobile-logout-link"
                    onClick={(e) => {
                      logOut();
                      handleNavClick();
                    }}
                  >
                    LOG OUT
                  </Nav.Link>
                )}
                {!isLogged && (
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className="black-link mobile-login-link"
                    onClick={handleNavClick}
                  >
                    LOGIN
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>

            <div className="link-btn desktop-login-btn">
              {isLogged ? (
                <Link
                  to="/"
                  className="theme-btn btn-style-one"
                  onClick={logOut}
                >
                  LOG OUT
                </Link>
              ) : (
                <Link to="/login" className="theme-btn btn-style-one">
                  LOGIN
                </Link>
              )}
            </div>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

// import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../assets/images/custom/logo.png";
import { useAuth } from "../../../../context/Auth";
import loginService from "../../../../markup/pages/servicesAPI/login.service";

export default function Header() {
  const { isLogged, setIsLogged, employee } = useAuth();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  // Logout function
  const logOut = () => {
    //set the logout function from login service
    loginService.logOut();
    //set isLogged to false
    setIsLogged(false);
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
        <Navbar expand="lg" className="header-upper">
          <Container>
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" className="black-link">
                  HOME
                </Nav.Link>
                <Nav.Link as={Link} to="/about" className="black-link">
                  ABOUT US
                </Nav.Link>
                <Nav.Link as={Link} to="/services" className="black-link">
                  SERVICES
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" className="black-link">
                  CONTACT US
                </Nav.Link>
                {isAdmin && (
                  <Nav.Link className="black-link admin-panel">ADMIN</Nav.Link>
                )}
              </Nav>

              <span className="nav-separator">|</span>
            </Navbar.Collapse>

            {isLogged ? (
              <div className="link-btn">
                <Link
                  to="/"
                  className="theme-btn btn-style-one"
                  onClick={logOut}
                >
                  LOG OUT
                </Link>
              </div>
            ) : (
              <div className="link-btn">
                <Link to="/login" className="theme-btn btn-style-one">
                  LOGIN
                </Link>
              </div>
            )}
          </Container>
        </Navbar>
      </header>
    </>
  );
}

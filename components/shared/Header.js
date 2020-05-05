import React, { useState } from "react";
import Login from "../buttons/Login";
import Logout from "../buttons/Logout";
import auth0 from "../../services/auth0";
import { useRouter } from "next/router";
import DropDownSiteOwnerBlogMenu from "../buttons/DropDownSiteOwnerBlog";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggle = () => setIsOpen(!isOpen);
  const { isAuthenticated, user, className, isSiteOwner } = props;

  //------SETTING  NAVBAR IF TOGGLE BAR IS OPEN
  const menuOpenClass = isOpen ? "menu-open" : "menu-close";

  const renderBlogMenu = () => {
    if (isSiteOwner) {
      return <DropDownSiteOwnerBlogMenu />;
    }
    return (
      <NavItem
        className={`port-navbar-item ${
          router.pathname === "/blogs" ? "active" : ""
        }`}
      >
        <NavLink href="/blogs">BLOGS</NavLink>
      </NavItem>
    );
  };
  return (
    <div>
      <Navbar
        className={`port-navbar port-nav-base absolute ${className} ${menuOpenClass}`}
        color="transparent"
        dark
        expand="md"
      >
        <NavbarBrand className="port-navbar-brand" href="/">
          YILMAZ
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem
              className={`port-navbar-item ${
                router.pathname === "/index" ? "active" : ""
              }`}
            >
              <NavLink href="/index">HOME</NavLink>
            </NavItem>
            <NavItem
              className={`port-navbar-item ${
                router.pathname === "/about" ? "active" : ""
              }`}
            >
              <NavLink href="/about">ABOUT</NavLink>
            </NavItem>
            <NavItem
              className={`port-navbar-item ${
                router.pathname === "/portfolios" ? "active" : ""
              }`}
            >
              <NavLink href="/portfolios">PORTFOLIOS</NavLink>
            </NavItem>
            <NavItem
              className={`port-navbar-item ${
                router.pathname === "/cv" ? "active" : ""
              }`}
            >
              <NavLink href="/cv">CV</NavLink>
            </NavItem>
            <NavItem
              className={`port-navbar-item ${
                router.pathname === "/blogs" ? "active" : ""
              }`}
            ></NavItem>
            {renderBlogMenu()}

            <NavItem className="port-navbar-item">
              <NavLink href="https://github.com/yilmazbingo">GITHUB</NavLink>
            </NavItem>

            {isAuthenticated ? (
              <NavItem className="port-navbar-item">
                <NavLink onClick={() => auth0.logout()}>
                  <Logout />
                </NavLink>
              </NavItem>
            ) : (
              <NavItem className="port-navbar-item">
                <NavLink onClick={() => auth0.login()}>
                  <Login />
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

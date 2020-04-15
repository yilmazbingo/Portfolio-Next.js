import React, { useState } from "react";
import Login from "../buttons/Login";
import Logout from "../buttons/Logout";
import auth0 from "../../services/auth0";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Header = (props) => {
  //destructuring, state value and
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const { isAuthenticated, user, className } = props;

  return (
    <div>
      <Navbar
        className={`port-navbar port-nav-base absolute ${className}`}
        color="transparent"
        dark
        expand="md"
      >
        <NavbarBrand className="port-navbar-brand" href="/">
          Yilmaz
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="port-navbar-item">
              <NavLink href="/index">Home</NavLink>
            </NavItem>
            <NavItem className="port-navbar-item">
              <NavLink href="/about">About</NavLink>
            </NavItem>
            <NavItem className="port-navbar-item">
              <NavLink href="/portfolios">Portfolios</NavLink>
            </NavItem>
            <NavItem className="port-navbar-item">
              <NavLink href="/cv">Cv</NavLink>
            </NavItem>
            <NavItem className="port-navbar-item">
              <NavLink href="/blogs">Blogs</NavLink>
            </NavItem>
            <NavItem className="port-navbar-item">
              <NavLink href="https://github.com/yilmazbingo">GitHub</NavLink>
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

// const BsNavlink = (props) => {
//   const { route, title } = props;
//   return (
//     <Link href={route}>
//       <a className="nav-link">{title} </a>
//     </Link>
//   );
// };

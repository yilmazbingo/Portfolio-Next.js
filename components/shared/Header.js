// import React from "react";
// import Link from "next/link";
// import { Link as DynamicLink } from "../../routes";

// class Header extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         <Link href="/index">
//           <a>Home</a>
//         </Link>
//         <Link href="/about">
//           <a>About</a>
//         </Link>
//         <Link href="/blogs">
//           <a>Blogs</a>
//         </Link>
//         <Link href="/cv">
//           <a>Cv</a>
//         </Link>
//         <Link href="/portfolios">
//           <a>Portfolios</a>
//         </Link>
//         <DynamicLink route="blog" params={{ id: "2" }}>
//           <a>Hello world</a>
//         </DynamicLink>

//         <style jsx>
//           {`
//             a {
//               font-size: 20px;
//             }
//           `}
//         </style>
//       </React.Fragment>
//     );
//   }
// }

import React, { useState } from "react";
import Login from "../buttons/Login";
import Logout from "../buttons/Logout";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const BsNavlink = (props) => {
  const { route, title } = props;
  return (
    <Link href={route}>
      <a className="nav-link">{title} </a>
    </Link>
  );
};

const Header = (props) => {
  //destructuring, state value and
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        className="port-navbar port-default absolute"
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
            <NavItem className="port-navbar-item">
              <NavLink href="">Login</NavLink>
            </NavItem>
            <NavItem className="port-navbar-item">
              <NavLink href="">Logout</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

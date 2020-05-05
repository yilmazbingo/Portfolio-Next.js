import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
} from "reactstrap";
import { useRouter } from "next/router";

const DropDownSiteOwnerBlogMenu = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const router = useRouter();
  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      className="port-dropdown-menu"
    >
      <DropdownToggle className="dropdown-toggle" nav caret>
        BLOG
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <NavItem className="port-dropdown-item ">
            <NavLink href="/blogs">BLOGS</NavLink>
          </NavItem>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <NavItem className="port-dropdown-item ">
            <NavLink href="/blogs/dashboard">CREATE BLOG</NavLink>
          </NavItem>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <NavItem className="port-dropdown-item ">
            <NavLink href="/blogs">BLOGS DASHBOARD</NavLink>
          </NavItem>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownSiteOwnerBlogMenu;

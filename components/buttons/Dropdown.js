import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const PortButtonDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { changeBlogStatus, status } = props;

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown className="port-dropdown" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret></DropdownToggle>
      <DropdownMenu>
        {status === "draft" ? (
          <DropdownItem>Publish Story</DropdownItem>
        ) : (
          <DropdownItem>Make it Draft</DropdownItem>
        )}
        <DropdownItem divider />
        <DropdownItem>Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PortButtonDropdown;

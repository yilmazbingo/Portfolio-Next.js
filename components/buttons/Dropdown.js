import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const PortButtonDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { changeBlogStatus, status, items } = props;

  const renderMenu = (items) => {
    return (
      <DropdownMenu>
        {items.map((item, index) => (
          <DropdownItem key={index} {...item.handlers}>
            {item.text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    );
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown className="port-dropdown" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret></DropdownToggle>
      {renderMenu(items)}
    </Dropdown>
  );
};

export default PortButtonDropdown;

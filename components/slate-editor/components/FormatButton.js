import React from "react";
import { useSlate } from "slate-react";
import { Button } from "../Components";
import { toggleFormat, isFormatActive } from "../utils";
import { Icon } from "../Components";

const FormatButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default FormatButton;

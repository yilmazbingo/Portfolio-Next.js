import React from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";

const PortInput = ({
  onChange,
  type,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...rest
}) => {
  console.log("errors", errors);
  return (
    <FormGroup>
      <Label className="label">{field.name.toUpperCase()}</Label>
      <Input type={type} {...field} {...rest} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </FormGroup>
  );
};

export default PortInput;
//input alreadt has its class applied to it

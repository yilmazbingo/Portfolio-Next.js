import React, { useState } from "react";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import { FormGroup, Label, Button } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";

const FormDate = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isHidden, setIsHidden] = useState(false);

  // passing "field" from formik to handle change will not work. because we need to pass event or path
  // but here we are just passing plain date.every handle change needs "event"
  const handleChange = (date) => {
    const { setFieldValue, setFieldTouched } = props.form;
    const { name } = props.field;
    setStartDate(date);
    // it internally uses the setstate. so it is async
    setFieldValue(name, date, true);
    setFieldTouched(name, true, true);
  };

  const toggleDate = (date) => {
    const { setFieldValue, setFieldTouched } = props.form;
    const { name } = props.field;
    setIsHidden(!isHidden);
    setFieldValue(name, date, true);
    setFieldTouched(name, true, true);
  };
  const { name } = props.field;
  const nameUpperCase = name.toUpperCase();
  const {
    canBeDisabled,
    field,
    form: { touched, errors },
  } = props;
  return (
    <FormGroup>
      <Label className="label">{nameUpperCase}</Label>
      <div className="input-group">
        {!isHidden && (
          <DatePicker
            selected={startDate}
            onChange={(date) => handleChange(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            maxDate={addDays(new Date(), 0)}
            dropdownMode="select"
          />
        )}
      </div>
      {canBeDisabled && !isHidden && (
        <Button onClick={() => toggleDate()}>Still Working Here</Button>
      )}

      {canBeDisabled && isHidden && (
        <React.Fragment>
          <span>Still working here</span>
          <Button onClick={(date) => toggleDate(date)}> Set End Date</Button>
        </React.Fragment>
      )}
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </FormGroup>
  );
};

export default FormDate;

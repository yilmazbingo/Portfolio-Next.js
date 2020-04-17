import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, FormGroup, Label } from "reactstrap";
import FormInput from "../form/FormInput";
import FormDate from "../form/FormDate";

// const validateInputs = () => {
//   const errors = {};

//   //Object.keys return array
//   // Object.keys(values).forEach(() => {
//   // Object.entries(values).forEach(([key, value]) => {
//   //   if (!values[key] && key !== "endDate") {
//   //     errors[key] = `Field ${key} is required!`;
//   //   }
//   // });

//   // const startDate = moment(values.startDate);
//   // const endDate = moment(values.endDate);

//   // if (startDate && endDate && endDate.isBefore(startDate)) {
//   //   errors.endDate = "End Date cannot be before start date!!!";
//   // }

//   return errors;
// };

const INITIAL_VALUES = {
  title: "",
  company: "",
  location: "",
  position: "",
  description: "",
  startDate: "",
  endDate: "",
};
const PortfolioForm = (props) => {
  console.log("props in form", props);
  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        // validate={validateInputs}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="title" component={FormInput}></Field>
            <Field type="text" name="company" component={FormInput} />
            <Field type="text" name="location" component={FormInput} />
            <Field type="text" name="position" component={FormInput} />
            <Field type="textarea" name="description" component={FormInput} />
            <Field name="startDate" component={FormDate} />
            <Field name="endDate" component={FormDate} canBeDisabled={true} />
            <button type="submit" disabled={isSubmitting}>
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PortfolioForm;

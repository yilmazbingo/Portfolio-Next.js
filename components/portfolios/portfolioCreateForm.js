import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormInput from "../form/FormInput";
import FormDate from "../form/FormDate";
import { Schema } from "../form/yupSchema";
import { Button, Alert } from "reactstrap";

const PortfolioForm = ({ initialValues, onSubmit, error }) => {
  let inputs = {};

  const handleKeyPress = (value, event) => {
    if (event.key === "Enter") {
      inputs[value].focus();
    }
  };
  const setRef = (name) => (input) => {
    inputs[name] = input;
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        // validate={schema.validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <Field
              type="text"
              name="title"
              component={FormInput}
              innerRef={setRef("title")}
              onKeyPress={(event) => handleKeyPress("company", event)}
            ></Field>
            <Field
              type="text"
              name="company"
              component={FormInput}
              innerRef={setRef("company")}
              onKeyPress={(event) => handleKeyPress("location", event)}
            />
            <Field
              type="text"
              name="location"
              component={FormInput}
              innerRef={setRef("location")}
              onKeyPress={(event) => handleKeyPress("position", event)}
            />
            <Field
              type="text"
              name="position"
              component={FormInput}
              innerRef={setRef("position")}
              onKeyPress={(event) => handleKeyPress("description", event)}
            />
            <Field
              type="textarea"
              name="description"
              component={FormInput}
              innerRef={setRef("description")}
              onKeyPress={(event) => handleKeyPress("title", event)}
            />
            <Field name="startDate" component={FormDate} />
            <Field name="endDate" component={FormDate} canBeDisabled={true} />
            {error && <Alert color="danger"> {error}</Alert>}
            <Button
              type="submit"
              disabled={isSubmitting}
              outline
              onClick={handleSubmit}
              size="lg"
              color="success"
            >
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PortfolioForm;

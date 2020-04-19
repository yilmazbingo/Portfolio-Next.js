import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormInput from "../form/FormInput";
import FormDate from "../form/FormDate";
import { Schema } from "../form/yupSchema";
import { Button, Alert } from "reactstrap";

const PortfolioForm = ({ initialValues, onSubmit, error }) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        // validate={schema.validate}
        onSubmit={onSubmit}
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
            {error && <Alert color="danger"> {error}</Alert>}
            <Button
              type="submit"
              disabled={isSubmitting}
              outline
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

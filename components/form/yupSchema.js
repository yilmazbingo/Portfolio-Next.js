import React from "react";
import * as Yup from "yup";

export const Schema = Yup.object({
  title: Yup.string()
    .min(5, "Please enter more than 5 characters")
    .required("Please enter your title")
    .max(10, "Please enter no more than 10 characters"),
  company: Yup.string()
    .min(5, "Please enter more than 5 characters")
    .required("Please enter your compant name")
    .max(10, "Please enter no more than 10 characters"),
  location: Yup.string()
    .min(5, "Please enter more than 5 characters")
    .required("Please enter your location")
    .max(10, "Please enter no more than 10 characters"),
  position: Yup.string()
    .min(5, "Please enter more than 5 characters")
    .required("Please enter your position")
    .max(10, "Please enter no more than 10 characters"),
  description: Yup.string()
    .min(5, "Please enter more than 5 characters")
    .required("Please add description")
    .max(10, "Please enter no more than 20 characters"),
  startDate: Yup.date().required("Please choose the date"),
  endDate: Yup.date(),
});

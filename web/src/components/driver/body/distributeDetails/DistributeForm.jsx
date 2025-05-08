import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const DistributeSchema = yup.object({
  business_name: yup
    .string()
    .matches(/^[A-Z][a-zA-Z\s]*$/, "Business Name must start with a capital letter and contain only letters")
    .required("Business Name is required"),
  registation_no: yup
    .string()
    .matches(/^[A-Z]+-\d+$/, "Registration Number must start with capital letters, followed by a hyphen and numbers")
    .required("Registration Number is required"),
  situated_place: yup
    .string()
    .matches(/^[A-Z][a-zA-Z\s]*$/, "Situated Place must start with a capital letter and contain only letters")
    .required("Situated Place is required"),
  Owner_name: yup
    .string()
    .matches(/^[A-Z][a-zA-Z\s]*$/, "Owner Name must start with a capital letter and contain only letters")
    .required("Owner Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone_no: yup
    .string()
    .matches(/^\d+$/, "Phone Number must contain only numbers")
    .required("Phone Number is required"),
});


const DistributeForm = ({ handleSubmit, initialData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      _id: initialData ? initialData._id : "",
      business_name: initialData ? initialData.business_name : "",
      registation_no: initialData ? initialData.registation_no : "",
      situated_place: initialData ? initialData.situated_place : "",
      Owner_name: initialData ? initialData.Owner_name : "",
      email: initialData ? initialData.email : "",
      phone_no: initialData ? initialData.phone_no : "",
    },
    validationSchema: DistributeSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-container">
        {/* Simplified layout: One column for all fields */}
        <div className="mb-3">
          <label htmlFor="business_name" className="form-label">
            Business Name
          </label>
          <input
            type="text"
            className="form-control"
            name="business_name"
            placeholder="Business Name"
            value={formik.values.business_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.business_name && formik.errors.business_name && (
            <div className="error">{formik.errors.business_name}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="registation_no" className="form-label">
            Registration Number
          </label>
          <input
            type="text"
            className="form-control"
            name="registation_no"
            placeholder="Registration Number"
            value={formik.values.registation_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.registation_no && formik.errors.registation_no && (
            <div className="error">{formik.errors.registation_no}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="situated_place" className="form-label">
            Situated Place
          </label>
          <input
            type="text"
            className="form-control"
            name="situated_place"
            placeholder="Situated Place"
            value={formik.values.situated_place}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.situated_place && formik.errors.situated_place && (
            <div className="error">{formik.errors.situated_place}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="Owner_name" className="form-label">
            Owner Name
          </label>
          <input
            type="text"
            className="form-control"
            name="Owner_name"
            placeholder="Owner Name"
            value={formik.values.Owner_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Owner_name && formik.errors.Owner_name && (
            <div className="error">{formik.errors.Owner_name}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phone_no" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            name="phone_no"
            placeholder="Phone Number"
            value={formik.values.phone_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone_no && formik.errors.phone_no && (
            <div className="error">{formik.errors.phone_no}</div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-end border-top">
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    </form>
  );
};

export default DistributeForm;

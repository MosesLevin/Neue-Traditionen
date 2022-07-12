/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import "./Form.css";

const schema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(255)
    .case("lower")
    .required("title is required")
    .messages({
      "string.base": `title should be a type of 'text'`,
      "string.min": `title should have at least 3 characters`,
      "string.max": `title should have less than 255 characters`,
      "string.empty": "title can't be empty",
      "string.required": `title is a required field`,
    }),
  mobile: Joi.string().trim().required().messages({
    "string.base": ` mobile should be a type of 'number'`,
    "string.empty": ` mobile cannot be an empty field`,
    //"string.base.patern": `"" 10 digital numbers`,
    "any.required": ` mobile is requireed`,
  }),
  /* .trim() */
  /* .regex(/^[6-9]\d{9}$/) */

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required("email is required"),
  price: Joi.number().integer().precision(2).required("price is required"),
});

function Form({ editProvider, providerList }) {
  console.log(editProvider);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: "onBlur",
  });
  const [show, setShow] = useState(false);
  const [handelError, setHandelError] = useState("");
  const [varient, setVarient] = useState("");
  useEffect(() => {
    if (editProvider.id) {
      setValue("title", editProvider.title);
      setValue("mobile", editProvider.mobile);
      setValue("email", editProvider.email);
      setValue("price", editProvider.price);
    }
  }, [editProvider]);
  const onSubmit = (data, e) => {
    console.log("data:", data);
    const requestData = editProvider.id ? axios.put : axios.post;
    requestData("http://localhost:5000/provider", {
      title: data.title,
      mobile: data.mobile,
      email: data.email,
      price: data.price,
      id: editProvider.id,
    })
      .then((respons) => {
        console.log(respons);
        providerList();
        e.target.reset();
        setHandelError("It was successfull");
        setShow(true);
        setVarient("success");
        setValue("title", "");
        setValue("mobile", "");
        setValue("email", "");
        setValue("price", "");
        editProvider.id = null;
      })
      .catch((err) => {
        if (err) {
          setHandelError(err.response.data.message);
          setShow(true);
          setVarient("danger");
        }

        //alert(err.response.data.message);
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      {show && (
        <Alert
          className="alert-link"
          variant={varient}
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>{handelError}</Alert.Heading>
        </Alert>
      )}
      <div className="form-row form-title">
        <h4>Add Funeral Provider</h4>
      </div>
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom01">Title</label>
          <input
            {...register("title", { onBlur: (e) => console.log(e) })}
            className={`form-control ${errors.title && "error-input"}`}
            id="validationCustom01"
            placeholder="Name Provider"
          />
          {errors.title && (
            <p className="error-message">{errors.title.message}</p>
          )}
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom02">Mobile</label>
          <input
            {...register("mobile")}
            className={`form-control ${errors.mobile && "error-input"}`}
            id="validationCustom02"
            placeholder="Phone Number"
          />
          {errors.mobile && (
            <p className="error-message">{errors.mobile.message}</p>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom03">Email</label>
          <input
            {...register("email")}
            className={`form-control ${errors.email && "error-input"}`}
            id="inputEmail3"
            placeholder="Email"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom04">Price</label>
          <input
            {...register("price", { valueAsNumber: true })}
            className={`form-control ${errors.price && "error-input"}`}
            id="inputPrice4"
            placeholder="Price"
          />
          {errors.price && (
            <p className="error-message">{errors.price.message}</p>
          )}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        {editProvider.id ? "Edite Funeral Provider" : "Create Funeral Provider"}
      </button>
      <div className="form-row form-bottom"></div>
    </form>
  );
}
export default Form;

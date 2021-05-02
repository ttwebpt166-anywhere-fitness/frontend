import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { sampleClass } from "./SampleClass";
import * as yup from "yup";
// import { gsap } from "gsap";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import { fetchData } from "../actions";

const AddClass = () => {
  const [fitClass, setClass] = useState(sampleClass);

  // Set the state for the errors for validation
  const [errors, setErrors] = useState([]);

  // Set state for to disable submit button
  const [disableSubmit, setDisableSubmit] = useState(false);

  const { push } = useHistory();

  // Form schema to be used for form validation
  const formSchema = yup.object().shape({
    name: yup.string().required("Please enter a title."),
    type: yup.string(),
    start_time: yup.string(),
    duration: yup.string(),
    intensity: yup.string(),
    location: yup.string(),
    maxSize: yup
      .number()
      .typeError("Guests field must be a number")
      .required("Please enter guests number."),
  });

  // Form to catch any errors if the form did not validated
  const formErrors = (e) => {
    // Make a copy of the errors state
    let allErrors = { ...errors };

    // Cycle through all data and check
    for (const ClassData in fitClass) {
      yup
        .reach(formSchema, ClassData)
        .validate(fitClass[ClassData])
        .then((valid) => {
          allErrors[`${ClassData}`] = "";
        })
        .catch((err) => {
          allErrors[`${ClassData}`] = err.errors[0];
        });
    }

    // Set the errors into the state
    setErrors(allErrors);
  };

  const addClass = (e) => {
    e.preventDefault();

    // Check for errors first
    formErrors();

    console.log("hitting addClass");

    // Check if the form passes the validation
    formSchema.isValid(fitClass).then((valid) => {
      console.log("is my form valid?", valid);

      if (valid) {
        // Ensure to eliminate all errors if form is valid
        setErrors({});

        // Submit the form
        axiosWithAuth()
          .post("https://airbnb-best-price.herokuapp.com/api/rental/", fitClass)
          // console
          //   .log(fitClass)
          .then((res) => {
            console.log("AddClass.js: post: res: ", res);
            fetchData();
            push("/classes");
          })
          .catch((err) => console.error("err from AddClass", err));
      } else {
        setDisableSubmit(true);

        setTimeout(() => {
          setDisableSubmit(false);
        }, 1000);
      }
    });
  };
  const handleChange = (e) => {
    setClass({
      ...fitClass,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-container">
      <h3>Add A Class</h3>

      <form onSubmit={addClass}>
        <label
          htmlFor="title"
          className={`${
            errors.title !== "" && errors.title !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Class
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            placeholder="Enter a class name"
            value={fitClass.name}
          />
        </label>

        <label
          htmlFor="type"
          className={`${
            errors.type !== "" && errors.type !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Type
          <input
            type="text"
            name="type"
            id="type"
            onChange={handleChange}
            placeholder="e.g., 'cardio', 'stretch', 'body-weight'"
            value={fitClass.type}
          />
        </label>

        <label
          htmlFor="location"
          className={`${
            errors.location !== "" && errors.location !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Location
          <input
            type="text"
            name="location"
            id="location"
            onChange={handleChange}
            placeholder="e.g. 'Central Park', 'Pines Shopping Center'"
            value={fitClass.location}
          />
        </label>

        <label
          htmlFor="start_time"
          className={`${
            errors.start_time !== "" && errors.start_time !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Start Time
          <input
            type="text"
            name="start_time"
            id="start_time"
            onChange={handleChange}
            value={fitClass.start_time}
          />
        </label>

        <label
          htmlFor="duration"
          className={`${
            errors.duration !== "" && errors.duration !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Duration
          <input
            type="text"
            name="duration"
            id="duration"
            onChange={handleChange}
            placeholder="30min, 90min, etc."
            value={fitClass.duration}
          />
        </label>
        <label
          htmlFor="duration"
          className={`${
            errors.duration !== "" && errors.duration !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
         Intensity 
          <input
            type="text"
            name="intensity"
            id="intensity"
            onChange={handleChange}
            placeholder="beginner, advanced, low-impact"
            value={fitClass.intensity}
          />
        </label>

        <label
          htmlFor="guests"
          className={`${
            errors.intensity !== "" && errors.intensity !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Maximum Class Size
          <input
            type="number"
            name="maxSize"
            id="maxSize"
            onChange={handleChange}
            placeholder="Max number of clients"
            value={fitClass.maxSize}
          />
        </label>

      <div>
          <button id="button" className="btn" type="submit" disabled={disableSubmit}>
            Add Class
          </button>
        </div>
      </form>

      {Object.keys(errors).length > 0 && (
        <div className="errors">
          {Object.keys(errors).map((key) => (
            <p value={key} key={key}>
              {errors[key]}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddClass;

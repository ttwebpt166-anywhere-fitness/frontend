import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { sampleClass } from "./SampleClass";
import * as yup from "yup";
// import { gsap } from "gsap";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import { fetchData } from "../actions";

const AddClass = () => {
  const [listing, setListing] = useState(sampleClass);

  // Set the state for the errors for validation
  const [errors, setErrors] = useState([]);

  // Set state for to disable submit button
  const [disableSubmit, setDisableSubmit] = useState(false);

  const { push } = useHistory();

  // Form schema to be used for form validation
  const formSchema = yup.object().shape({
    id: yup.string(),
    renter_id: yup.string(),
    title: yup.string().required("Please enter a title."),
    description: yup.string(),
    type: yup.string(),
    location: yup.string(),
    street_address: yup.string().required("Please enter a street address"),
    city: yup.string().required("Please enter a city"),
    state: yup.string().required("Please enter a state"),
    guests: yup
      .number()
      .typeError("Guests field must be a number")
      .required("Please enter guests number."),
    bedrooms: yup
      .number()
      .typeError("Bedrooms field must be a number")
      .required("Please enter bedrooms number."),
    beds: yup
      .number()
      .typeError("Beds field must be a number")
      .required("Please enter beds number."),
    baths: yup
      .number()
      .typeError("Baths field must be a number")
      .required("Please enter baths number."),
    // amenity: yup.string(),
    // price: yup.number().typeError("Price field must be a number"),
    featuredImg: yup.string(),
    country: yup.string(),
    zip: yup.number(),
  });

  // Form to catch any errors if the form did not validated
  const formErrors = (e) => {
    // Make a copy of the errors state
    let allErrors = { ...errors };

    // Cycle through all data and check
    for (const listingData in listing) {
      yup
        .reach(formSchema, listingData)
        .validate(listing[listingData])
        .then((valid) => {
          allErrors[`${listingData}`] = "";
        })
        .catch((err) => {
          allErrors[`${listingData}`] = err.errors[0];
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
    formSchema.isValid(listing).then((valid) => {
      console.log("is my form valid?", valid);

      if (valid) {
        // Ensure to eliminate all errors if form is valid
        setErrors({});

        // Submit the form
        axiosWithAuth()
          .post("https://airbnb-best-price.herokuapp.com/api/rental/", listing)
          // console
          //   .log(listing)
          .then((res) => {
            console.log("AddClass.js: post: res: ", res);
            fetchData();
            push("/classes");
          })
          .catch((err) => console.error("err from AddClass", err));
      } else {
        // Add a little animation if not valid
        // const errorAnim = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        // errorAnim.to(".form-container", { x: -50, duration: 0.2 });
        // errorAnim.to(".form-container", { x: 50, duration: 0.2 });
        // errorAnim.to(".form-container", { x: -20, duration: 0.2 });
        // errorAnim.to(".form-container", { x: 20, duration: 0.2 });
        // errorAnim.to(".form-container", { x: 0, duration: 0.2 });

        // Disable the submit button while the animation plays
        setDisableSubmit(true);

        setTimeout(() => {
          setDisableSubmit(false);
        }, 1000);
      }
    });
  };
  const handleChange = (e) => {
    setListing({
      ...listing,
      [e.target.name]: e.target.value,
    });
  };
  // const handleAmenitiesChange = (e) => {
  //   const changedAmenities = e.target.value.split(",");
  //   setListing({
  //     ...listing,
  //     amenity: changedAmenities,
  //   });
  // };

  return (
    <div className="form-container">
      <h3>Add A Listing</h3>

      <form onSubmit={addClass}>
        <label
          htmlFor="title"
          className={`${
            errors.title !== "" && errors.title !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Title
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            placeholder="Enter a title"
            value={listing.title}
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
            placeholder="e.g., 'whole house', 'downstairs'"
            value={listing.type}
          />
        </label>
        <label
          htmlFor="country"
          className={`${
            errors.type !== "" && errors.type !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Country
          <input
            type="text"
            name="country"
            id="country"
            onChange={handleChange}
            placeholder="Country"
            value={listing.country}
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
          Relative Location
          <input
            type="text"
            name="location"
            id="location"
            onChange={handleChange}
            placeholder="e.g. 'Central Park', 'Pines Shopping Center'"
            value={listing.location}
          />
        </label>

        <label
          htmlFor="street_address"
          className={`${
            errors.street_address !== "" && errors.street_address !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Address
          <input
            type="text"
            name="street_address"
            id="street_address"
            onChange={handleChange}
            placeholder="Enter street address"
            value={listing.street_address}
          />
        </label>

        <label
          htmlFor="city"
          className={`${
            errors.city !== "" && errors.city !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          City
          <input
            type="text"
            name="city"
            id="city"
            onChange={handleChange}
            value={listing.city}
          />
        </label>

        <label
          htmlFor="state"
          className={`${
            errors.state !== "" && errors.state !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          State
          <input
            type="text"
            name="state"
            id="state"
            onChange={handleChange}
            placeholder="e.g. 'FL', 'NY'"
            value={listing.state}
          />
        </label>
        <label
          htmlFor="zip"
          className={`${
            errors.state !== "" && errors.state !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Zip Code
          <input
            type="number"
            name="zip"
            id="zip"
            onChange={handleChange}
            placeholder="Zip Code"
            value={listing.zip}
          />
        </label>

        <label
          htmlFor="guests"
          className={`${
            errors.guests !== "" && errors.guests !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Guests
          <input
            type="number"
            name="guests"
            id="guests"
            onChange={handleChange}
            placeholder="# of Guests Allowed"
            value={listing.guests}
          />
        </label>

        <label
          htmlFor="bedrooms"
          className={`${
            errors.bedrooms !== "" && errors.bedrooms !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Bedrooms
          <input
            type="number"
            name="bedrooms"
            id="bedrooms"
            onChange={handleChange}
            placeholder="# of Bedrooms"
            value={listing.bedrooms}
          />
        </label>

        <label
          htmlFor="beds"
          className={`${
            errors.beds !== "" && errors.beds !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Beds
          <input
            type="number"
            name="beds"
            id="beds"
            onChange={handleChange}
            placeholder="# of Beds"
            value={listing.beds}
          />
        </label>

        <label
          htmlFor="baths"
          className={`${
            errors.baths !== "" && errors.baths !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Bathrooms
          <input
            type="number"
            name="baths"
            id="baths"
            onChange={handleChange}
            placeholder="# of Bathrooms"
            value={listing.baths}
          />
        </label>

        {/* <label
          htmlFor="amenity"
          className={`${
            errors.amenity !== "" && errors.amenity !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Amenities
          <input
            type="text"
            name="amenity"
            id="amenity"
            onChange={handleAmenitiesChange}
            placeholder="Comma separated e.g., 'wifi, kitchen, pool"
            value={listing.amenity}
          />
        </label> */}

        {/* <label
          htmlFor="price"
          className={`${
            errors.price !== "" && errors.price !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Price
          <input
            type="number"
            name="price"
            id="price"
            onChange={handleChange}
            placeholder="Enter price per night"
            value={listing.price}
          />
        </label> */}

        <label
          htmlFor="featuredImg"
          className={`${
            errors.featuredImg !== "" && errors.featuredImg !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Featured Image
          <input
            type="text"
            name="featuredImg"
            id="featuredImg"
            onChange={handleChange}
            placeholder="Image URL"
            value={listing.featuredImg}
          />
        </label>

        <label
          htmlFor="description"
          className={`${
            errors.description !== "" && errors.description !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Description
          <textarea
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            value={listing.description}
          />
        </label>

        <div>
          <button className="btn" type="submit" disabled={disableSubmit}>
            Add Listing
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

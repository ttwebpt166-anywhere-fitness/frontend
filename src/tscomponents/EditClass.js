import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { sampleClass } from "./SampleClass";
import * as yup from "yup";
// import { gsap } from "gsap";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

export default function EditListing() {
  const [listing, setListing] = useState(sampleClass);

  // Set the state for the errors for validation
  const [errors, setErrors] = useState([]);

  // Set state for to disable submit button
  const [disableSubmit, setDisableSubmit] = useState(false);

  const { id } = useParams();
  console.log("id", id);
  const { push } = useHistory();
  useEffect(() => {
    axiosWithAuth()
      .get(`https://airbnb-best-price.herokuapp.com/api/rental/${id}`)
      .then((res) => {
        console.log("EditListing.js: useEffect: get: res: ", res);
        var response = res.data;
        // delete response.id;
        delete response.amenity;
        setListing(response);
      })
      .catch((err) => console.error(`unable to getById # ${id}: `, err));
  }, [id]);

  const handleChange = (e) => {
    e.persist();
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
    amenity: yup.string(),
    // price: yup.number().typeError("Price field must be a number"),
    salePrice: yup.string(),
    featuredImg: yup.string(),
    country: yup.string(),
    zip: yup.string(),
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for errors first
    formErrors();

    // Check if the form passes the validation
    formSchema.isValid(listing).then((valid) => {
      console.log("is my form valid?", valid);

      if (valid) {
        // Ensure to eliminate all errors if form is valid
        setErrors({});

        // Submit the form
        axiosWithAuth()
          .put(
            `https://airbnb-best-price.herokuapp.com/api/rental/${id}`,
            listing
          )
          .then((res) => {
            console.log("Response from PUT;", res);
            push("/classes");
          })
          .catch((err) => {
            console.log("Error from PUT:", err);
          });
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
  console.log("listing", listing);
  return (
    <div className="form-container">
      <h3>Edit Listing</h3>

      <form onSubmit={handleSubmit}>
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
        {/* 
        <label
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
            Edit Listing
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
}

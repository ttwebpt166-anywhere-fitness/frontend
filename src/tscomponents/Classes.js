// Import Dependencies
import React, { useEffect, useState } from "react";
// import { gsap } from "gsap";
import { Link, useHistory } from "react-router-dom";
// Import Components
import ClassCard from "./ClassCard";
import { connect, useSelector } from "react-redux";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

const Classes = (props) => {
  const user = useSelector((state) => state.user.data?.user);
  const history = useHistory();
  useEffect(() => {
    // console.log(user);
    if (!user) {
      history.replace("/auth/login");
    }
  }, []);
  // Setup the state that will get the classes
  const [classes, setClasses] = useState([]);

  // Set a state to disable buttons when it is deleting
  const [isDeleting, setIsDeleting] = useState(false);

  // Function for deleting a listing
  const deleteListing = (id) => {
    // Create a new array where the listing that matches the ID is removed
    const newListingArray = classes.filter((listing) => listing.id !== id);

    setIsDeleting(true);

    // Do a small animation for the deleted listing
    // gsap.to(`#listing-${id}`, { scale: 0.8, opacity: 0.8, duration: 0.5 });
    // gsap.to(`#listing-${id}`, {
    //   x: -100,
    //   opacity: 0,
    //   duration: 0.5,
    //   delay: 0.5,
    // });

    // Set the new listing array to the classes once the animation finishes
    setTimeout(() => {
      setClasses(newListingArray);
      setIsDeleting(false);
    }, 1000);

    // Delete listing from backend
    console.log("id", id);
    axiosWithAuth()
      .delete(`https://airbnb-best-price.herokuapp.com/api/rental/${id}`)
      .then((res) => {
        console.log("Listing.sjs: deleteListing: res: ", res);
      })
      .catch((err) => console.log(`Unable to delete item # ${id}`, err));
  };

  return (
    <div id="classes">
      <div className="heading">
        <h3>
          Classes - {classes.length}{" "}
          {classes.length > 1 ? "classes" : "listing"} found
        </h3>

        <Link to="/AddClass">
          <button>Add New Listing</button>
        </Link>
      </div>

      {classes.length > 0 &&
        classes.map((listing, index) => {
          const delayTimer = index;

          return (
            <ClassCard
              listing={listing}
              key={listing.id}
              deleteListing={deleteListing}
              delay={delayTimer}
              isDeleting={isDeleting}
            />
          );
        })}

      {classes.length <= 0 && (
        <p style={{ textAlign: "center" }}>No Classes Found</p>
      )}
    </div>
  );
};

export default Classes;

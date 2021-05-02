import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ClassCard from "./ClassCard";
import { useSelector } from "react-redux";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

const Classes = (props) => {
  const user = useSelector((state) => state.user.data?.user);
  const history = useHistory();
  useEffect(() => {
    // console.log(user);
    // if (!user) {
    //   history.replace("/auth/login");
    // }
  }, [history, user]);
  // Setup the state that will get the classes
  const [classes, setClasses] = useState([]);

  // Set a state to disable buttons when it is deleting
  const [isDeleting, setIsDeleting] = useState(false);

  // Function for deleting a fitClass
  const deleteClass = (id) => {
    // Create a new array where the fitClass that matches the ID is removed
    const newClassArray = classes.filter((fitClass) => fitClass.id !== id);

    setIsDeleting(true);

    // Set the new fitClass array to the classes once the animation finishes
    setTimeout(() => {
      setClasses(newClassArray);
      setIsDeleting(false);
    }, 1000);

    // Delete fitClass from backend
    console.log("id", id);
    axiosWithAuth()
      .delete(`/:${id}`)
      .then((res) => {
        console.log("delete: res: ", res);
      })
      .catch((err) => console.log(`Unable to delete item # ${id}`, err));
  };

  return (
    <div id="classes">
      <div className="heading">
        <h3>
          Classes - {classes.length}{" "}
          {classes.length > 1 ? "classes" : "fitClass"} found
        </h3>

        <Link to="/AddClass">
          <button>Add New Class</button>
        </Link>
      </div>

      {classes.length > 0 &&
        classes.map((fitClass, index) => {
          const delayTimer = index;

          return (
            <ClassCard
              fitClass={fitClass}
              key={fitClass.id}
              deleteClass={deleteClass}
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

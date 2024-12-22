import React from "react";
import { Link } from "react-router-dom";

export default function AssignmentCard({ assignment, handleDelete }) {
  const {
    title,
    _id,
    description,
    marks,
    image,
    difficulty,
    dueDate,
    creator: { email, name },
  } = assignment || {};
  //   const handleDelete = ()
  return (
    <div>
      <div className="card bg-base-100 shadow-xl h-full">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{marks}</div>
            <div className="badge badge-outline">{difficulty}</div>
            {/* <div className="badge badge-outline">{dueDate.split("T")[0]}</div> */}
          </div>
          <div className="card-actions justify-start">
            <button
              onClick={() => handleDelete(_id, email)}
              className="btn btn-primary"
            >
              Delete
            </button>
            <Link to={`/update/${_id}`}>
              <button className="btn btn-secondary">Update</button>
            </Link>
            <Link to={`/details/${_id}`}>
              <button className="btn btn-accent">View</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

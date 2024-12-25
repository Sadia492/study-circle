import React from "react";
import { Link } from "react-router-dom";
import gif from "../assets/animation/icons8-eye.gif";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";

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
    <div className="hover:scale-105 transform transition duration-300 ease-in-out">
      <div className="card bg-base-100 shadow-xl h-full">
        <figure className="h-64 w-full">
          <img className="h-full object-cover w-full" src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge  bg-gradient-to-r from-primary to-secondary text-white">
              {difficulty}
            </div>
          </h2>
          <p>{description}</p>
          <div className="card-actions my-2 justify-start">
            <div className="badge badge-outline">Marks: {marks}</div>

            <div className="badge badge-outline">
              Due Date: {dueDate.split("T")[0]}
            </div>
          </div>
          <div className="card-actions justify-start">
            <Link to={`/details/${_id}`}>
              <button className="btn bg-gradient-to-r from-primary to-secondary text-white">
                <FaEye size={40} />
              </button>
            </Link>
            <Link to={`/update/${_id}`}>
              <button className="btn bg-gradient-to-r from-primary to-secondary text-white">
                <FaPen size={30} />
              </button>
            </Link>
            <button
              onClick={() => handleDelete(_id, email)}
              className="btn bg-gradient-to-r from-primary to-secondary text-white"
            >
              <FaTrashAlt size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

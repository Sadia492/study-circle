import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

export default function AssignmentDetails() {
  const { id } = useParams();
  const { data: assignment } = useQuery({
    queryKey: ["assignment"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/assignment/${id}`
      );

      return data;
    },
  });
  console.log(assignment);
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
  return (
    <div>
      {" "}
      <div className="flex lg:flex-row flex-col rounded-3xl mb-20 bg-base-100 gap-8 justify-center items-center shadow-xl w-11/12 mx-auto mt-20">
        <figure className="flex-1 p-4">
          <img className="w-full rounded-3xl" src={image} alt="Album" />
        </figure>
        <div className="flex-1 p-4">
          <h2 className="text-3xl font-bold ">{title}</h2>
          <p className=" text-gray-500 mb-6 mt-2">{description}</p>

          <p>
            <span className="font-bold">Total Marks: </span>
            {marks}
          </p>
          <div>
            <h3 className="font-bold text-lg mt-4">Other Info:</h3>
            <p>
              <span className="font-bold">Added By: </span>
              {name}
            </p>
            <p>
              <span className="font-bold">User's Email: </span>
              {email}
            </p>
          </div>
          <div className="space-x-2 my-4">
            <div className="badge bg-primary text-white p-3">{difficulty}</div>
            <div className="badge bg-secondary text-white p-3">
              Deadline: {dueDate.split("T")[0]}
            </div>
          </div>
          <div className="card-actions justify-start">
            <button
              // onClick={handleDonate}
              className="btn bg-gradient-to-r mt-3 from-primary to-secondary text-white"
            >
              Take Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

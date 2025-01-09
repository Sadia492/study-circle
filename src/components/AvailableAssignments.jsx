import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import AssignmentCard from "./AssignmentCard";
import { Link } from "react-router-dom";

export default function AvailableAssignments() {
  const {
    data: available,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["availableAssignments"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/assignments`
      );
      return data;
    },
  });

  //   console.log(available);

  return (
    <div className="w-11/12 mx-auto text-center mb-12">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary from-0 to-70% to-secondary text-transparent bg-clip-text">
        Available Assignments
      </h2>
      <p className="text-gray-400 mt-4 lg:w-3/5 mx-auto">
        The Available Assignments section displays a list of assignments fetched
        dynamically from the server. It provides users with a quick overview of
        tasks, ensuring up-to-date and accessible information.
      </p>
      <div className="mt-8">
        {isLoading && <LoadingSpinner></LoadingSpinner>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {available?.slice(0, 4)?.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
            ></AssignmentCard>
          ))}
        </div>
        <Link
          to="/assignments"
          className="flex justify-center items-center my-8"
        >
          <button className="btn bg-gradient-to-r from-primary to-secondary text-white">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
}

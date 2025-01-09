import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AssignmentCard from "../components/AssignmentCard";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

export default function Assignments() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("sort by"); // Default sorting order
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: assignments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignments", { filter, search }],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/assignments`,
        {
          params: { filter, search },
        }
      );
      return data;
    },
  });

  const handleDelete = async (id, email) => {
    if (!user) {
      return navigate("/login");
    }

    if (user.email === email) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/assignment/${id}`);

          // Show success message
          if (data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            // refetch data to refresh ui
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting the assignment.",
            icon: "error",
          });
        }
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Only the creator of the assignment can delete the assignment.",
        icon: "error",
      });
    }
  };
  const handleSort = (e) => {
    const sortOrder = e.target.value;
    setSort(sortOrder);

    // Directly sort the assignments in state
    if (assignments) {
      const sortedData = [...assignments].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.marks - b.marks;
        } else if (sortOrder === "dsc") {
          return b.marks - a.marks;
        }
        return 0;
      });

      // Update the assignments in the query cache to reflect sorting
      queryClient.setQueryData(["assignments", { filter, search }], sortedData);
    }
  };

  return (
    <div className="mt-24 bg-transparent w-11/12 mx-auto">
      <Helmet>
        <title>StudyCircle | Assignments</title>
      </Helmet>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary from-0 to-75% text-center to-secondary text-transparent bg-clip-text">
        Assignments
      </h2>
      <p className="text-gray-400 text-center mb-6 mt-4 lg:w-3/5 mx-auto">
        {" "}
        The Assignments page allows users to view, manage, and interact with
        assignments dynamically. Users can explore assignment details, update
        information, or delete assignments seamlessly.
      </p>
      <div className="flex mb-6 flex-col md:flex-row justify-center items-center gap-5 ">
        <div className="">
          <select
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
            name="difficulty"
            id="difficulty"
            className="border-2  border-primary p-4 rounded-lg"
          >
            <option value="">Filter By Difficulty Level</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="border-2  border-primary p-4 rounded-lg"
            type="text"
            name="search"
            placeholder="Enter Assignment Title"
            aria-label="Enter Assignment Title"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
          <select
            className="border-2 border-primary p-4 rounded-lg"
            value={sort}
            onChange={handleSort}
          >
            <option value="">Sort By Marks</option>
            <option value="asc">Ascending</option>
            <option value="dsc">Descending</option>
          </select>
        </div>
      </div>
      {isLoading && <LoadingSpinner></LoadingSpinner>}

      <div className="grid grid-cols-1 md:grid-cols-2 mt-12 lg:grid-cols-4 gap-6 ">
        {!isLoading && assignments?.length ? (
          assignments?.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              handleDelete={handleDelete}
            ></AssignmentCard>
          ))
        ) : (
          <p
            className={`text-2xl col-span-3 font-bold text-primary text-center ${
              isLoading ? "hidden" : ""
            }`}
          >
            No Assignment Created
          </p>
        )}
      </div>
    </div>
  );
}

import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import AssignmentCard from "../components/AssignmentCard";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

export default function Assignments() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  // const [searchText, setSearchText] = useState("");
  const { user } = useAuth();

  const { data: assignments } = useQuery({
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
          const { data } = await axios.delete(
            `${import.meta.env.VITE_URL}/assignment/${id}`
          );
          console.log(data);

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          // Update the cache or refetch data if necessary
          queryClient.setQueryData(["assignments"], (oldData) => {
            if (!oldData) return [];
            return oldData.filter((assignment) => assignment._id !== id);
          });
        } catch (error) {
          console.error("Error deleting assignment:", error);
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

  return (
    <div className="mt-24 w-11/12 mx-auto">
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
            className="border p-4 rounded-lg"
          >
            <option value="">Filter By Difficulty Level</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>

        <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            name="search"
            placeholder="Enter Assignment Title"
            aria-label="Enter Assignment Title"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {assignments?.map((assignment) => (
          <AssignmentCard
            key={assignment._id}
            assignment={assignment}
            handleDelete={handleDelete}
          ></AssignmentCard>
        ))}
      </div>
    </div>
  );
}

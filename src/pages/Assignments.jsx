import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import AssignmentCard from "../components/AssignmentCard";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

export default function Assignments() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: assignments } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/assignments`
      );
      return data;
    },
  });
  console.log(assignments);
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
    <div>
      Assignments
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

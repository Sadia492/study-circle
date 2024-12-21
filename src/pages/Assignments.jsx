import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import AssignmentCard from "../components/AssignmentCard";

export default function Assignments() {
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

  return (
    <div>
      Assignments
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {assignments?.map((assignment) => (
          <AssignmentCard
            key={assignment._id}
            assignment={assignment}
          ></AssignmentCard>
        ))}
      </div>
    </div>
  );
}

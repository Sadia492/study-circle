import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useAuth from "../hooks/useAuth";

export default function MyAttemptedAssignments() {
  const { user } = useAuth();

  const { data: submissions } = useQuery({
    queryKey: ["mySubmission"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/submissions/${user?.email}`
      );
      return data;
    },
  });
  console.log(submissions);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Assignment Title</th>
              <th>Status</th>
              <th>Assignment Marks</th>
              <th>Obtained Marks</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {submissions &&
              submissions?.map((submission, idx) => (
                <tr key={submission._id} className="hover">
                  <th>{idx + 1}</th>
                  <td>{submission.title}</td>
                  <td>{submission.status}</td>
                  <td>{submission.assignmentMarks}</td>
                  <td>{submission.obtainedMarks}</td>
                  <td>{submission.feedback}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

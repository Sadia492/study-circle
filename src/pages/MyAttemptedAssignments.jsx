import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import bgImg from "../assets/bgImg.png";

export default function MyAttemptedAssignments() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["mySubmission"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/submissions/${user?.email}`);
      return data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div
      className="mt-[5.5rem] "
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold text-center  text-white">
          My Attempted Assignments
        </h2>
        <p className=" mt-4 text-center mb-6 lg:w-3/5 mx-auto  text-white">
          The Attempted Assignments page showcases assignments users have
          completed or submitted. It provides a summary of their performance,
          including grades, submission status, and feedback.
        </p>
        <div className="overflow-x-auto">
          <table className="table text-center border-2">
            {/* head */}
            <thead>
              <tr className="font-bold text-white text-xl">
                <th className="border-2">#</th>
                <th className="border-2">Assignment Title</th>
                <th className="border-2">Status</th>
                <th className="border-2">Assignment Marks</th>
                <th className="border-2">Obtained Marks</th>
                <th className="border-2">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {submissions &&
                submissions?.map((submission, idx) => (
                  <tr key={submission._id} className="text-white font-medium">
                    <th className="border-2">{idx + 1}</th>
                    <td className="border-2">{submission.title}</td>
                    <td className="border-2 ">
                      <span className="px-3 py-1 font-medium rounded-full  bg-primary/30 text-primary">
                        {submission.status}
                      </span>
                    </td>
                    <td className="border-2">{submission.assignmentMarks}</td>
                    <td className="border-2">{submission.obtainedMarks}</td>
                    <td className="border-2">{submission.feedback}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import bgImg from "../assets/bgImg.png";
import { Helmet } from "react-helmet-async";

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
    <div className="mt-[5.5rem]">
      <Helmet>
        <title>StudyCircle | My Attempted</title>
      </Helmet>
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary from-0 to-75% to-secondary text-transparent bg-clip-text text-center">
          My Attempted Assignments
        </h2>
        <p className="mt-4 text-center mb-6 lg:w-3/5 mx-auto text-gray-400">
          The Attempted Assignments page showcases assignments users have
          completed or submitted. It provides a summary of their performance,
          including grades, submission status, and feedback.
        </p>
        {/* Ensure scrollbar is always visible */}
        <div
          className="overflow-x-scroll"
          style={{ overflowX: "scroll", whiteSpace: "nowrap" }}
        >
          <table className="table text-center border-separate border-spacing-y-3 w-full">
            {/* head */}
            <thead
              style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <tr className=" text-white rounded-lg">
                <th className="py-3 px-6">#</th>
                <th className="py-3 px-6">Assignment Title</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Assignment Marks</th>
                <th className="py-3 px-6">Obtained Marks</th>
                <th className="py-3 px-6">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length ? (
                submissions.map((submission, idx) => (
                  <tr
                    key={submission._id}
                    className="bg-white shadow-lg rounded-lg hover:scale-105 transform transition duration-300 ease-in-out"
                  >
                    <th className="py-3 px-6 text-primary">{idx + 1}</th>
                    <td className="py-3 px-6 text-gray-700 font-medium">
                      {submission.title}
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-3 py-1 font-medium rounded-full ${
                          submission.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        } `}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-gray-600">
                      {submission.assignmentMarks}
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <span
                          className={`text-gray-700 py-1 px-3 rounded-full font-medium ${
                            submission.obtainedMarks === "Not Rated"
                              ? "bg-yellow-100 text-yellow-600"
                              : ""
                          }`}
                        >
                          {submission.obtainedMarks}
                        </span>
                        {submission.obtainedMarks !== "Not Rated" && (
                          <img
                            src="https://img.icons8.com/color/48/trophy.png"
                            alt="Trophy"
                            className="w-6 h-6"
                          />
                        )}
                      </div>
                    </td>
                    <td className={`py-3 px-6 text-gray-700 `}>
                      <span
                        className={`rounded-full  py-1 px-3 font-medium ${
                          submission.feedback === "Not Checked"
                            ? "bg-yellow-100 text-yellow-600"
                            : ""
                        }`}
                      >
                        {submission.feedback}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-2xl font-bold text-primary">
                    No Assignment Attempted
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

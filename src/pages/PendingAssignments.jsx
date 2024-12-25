import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2";
import bgImg from "../assets/bgImg.png";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

Modal.setAppElement("#root");

export default function PendingAssignments() {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: pendingSubmissions,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/submissions/status/pending`);
      return data;
    },
  });

  const handleSubmit = async (e, examineeEmail, id, assignmentMarks) => {
    e.preventDefault();
    const form = e.target;
    const marks = form.marks.value;
    const feedback = form.feedback.value;
    const formData = { marks, feedback, status: "completed" };

    if (marks > assignmentMarks) {
      return toast.error("You cannot give marks more than the total marks");
    }

    if (user?.email !== examineeEmail) {
      try {
        const { data } = await axiosSecure.patch(
          `/update-submission/${id}`,
          formData
        );
        if (data.modifiedCount) {
          Swal.fire({
            title: "Success",
            text: "Marks given successfully",
            icon: "success",
          });
          refetch();
          setSelectedSubmission(null); // Close modal
        }
      } catch (err) {
        console.error("Error while posting data:", err);
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "The examinee cannot give marks to himself.",
        icon: "error",
      });
      setSelectedSubmission(null); // Close modal
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-[5.5rem]">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text text-center">
          Pending Assignments
        </h2>
        <p className="mt-4 text-center mb-6 lg:w-3/5 mx-auto text-gray-400">
          The Pending Assignments page lists assignments that are yet to be
          completed or submitted. It helps users track deadlines, prioritize
          tasks, and stay on top of their academic responsibilities.
        </p>
        <div className="overflow-x-scroll" style={{ overflowX: "scroll" }}>
          <table className="table text-center border-separate border-spacing-y-3 border-white w-full">
            <thead
              style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <tr className="text-white rounded-lg">
                <th className="py-3 px-6">#</th>
                <th className="py-3 px-6">Assignment Title</th>
                <th className="py-3 px-6">Assignment Marks</th>
                <th className="py-3 px-6">Examinee Name</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingSubmissions?.length ? (
                pendingSubmissions.map((submission, idx) => (
                  <tr
                    key={submission._id}
                    className="bg-white shadow-lg rounded-lg hover:scale-105 transform transition duration-300 ease-in-out"
                  >
                    <th className="py-3 px-6 text-primary">{idx + 1}</th>
                    <td className="py-3 px-6 text-gray-700 font-medium">
                      {submission.title}
                    </td>
                    <td className="py-3 px-6 text-gray-600">
                      {submission.assignmentMarks}
                    </td>
                    <td className="py-3 px-6 text-gray-700">
                      {submission?.examinee?.name}
                    </td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="btn bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform"
                      >
                        Give Marks
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-2xl font-bold text-primary">
                    No Pending Assignment Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedSubmission && (
        <Modal
          isOpen={!!selectedSubmission}
          onRequestClose={() => setSelectedSubmission(null)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg max-w-lg w-full shadow-lg"
          overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10"
        >
          <div>
            <p className="mb-2">
              <span className="font-bold">Submitted Link:</span>{" "}
              <a
                target="_blank"
                href={selectedSubmission?.link}
                className="text-primary underline"
              >
                Google Docs Link
              </a>
            </p>
            <p className="mb-4">
              <span className="font-bold">Submitted Note:</span>{" "}
              {selectedSubmission?.note}
            </p>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary text-center text-transparent bg-clip-text">
              Give Marks
            </h2>
            <form
              onSubmit={(e) =>
                handleSubmit(
                  e,
                  selectedSubmission?.examinee?.email,
                  selectedSubmission?._id,
                  selectedSubmission?.assignmentMarks
                )
              }
              className="card-body space-y-4"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Marks</span>
                </label>
                <input
                  type="number"
                  placeholder="marks"
                  name="marks"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Feedback</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  name="feedback"
                  placeholder="Give feedback"
                ></textarea>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-gradient-to-r from-primary to-secondary text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

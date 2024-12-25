import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2";
import bgImg from "../assets/bgImg.png";
import LoadingSpinner from "../components/LoadingSpinner";

Modal.setAppElement("#root");

export default function PendingAssignments() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    data: pendingSubmissions,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/submissions/status/pending`
      );
      return data;
    },
  });
  console.log(pendingSubmissions);
  const handleSubmit = async (e, examineeEmail, id) => {
    e.preventDefault();
    const form = e.target;
    const marks = form.marks.value;
    const feedback = form.feedback.value;
    const formData = { marks, feedback, status: "completed" };
    console.log({ marks, feedback, examineeEmail, email: user.email });
    if (user?.email !== examineeEmail) {
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_URL}/update-submission/${id}`,
          formData
        );
        if (data.modifiedCount) {
          Swal.fire({
            title: "Success",
            text: "Marks given successfully",
            icon: "success",
          });
          refetch();
          closeModal();
        }
      } catch (err) {
        console.error("Error while posting data:", err);
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "The examinee can not give marks.",
        icon: "error",
      });
      closeModal();
    }
  };
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="mt-[5.5rem]">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary from-0 to-75% to-secondary text-transparent bg-clip-text text-center">
          Pending Assignments
        </h2>
        <p className="mt-4 text-center mb-6 lg:w-3/5 mx-auto text-gray-400">
          The Pending Assignments page lists assignments that are yet to be
          completed or submitted. It helps users track deadlines, prioritize
          tasks, and stay on top of their academic responsibilities.
        </p>
        <div
          className="overflow-x-scroll"
          style={{ overflowX: "scroll", whiteSpace: "nowrap" }}
        >
          <table className="table text-center border-separate border-spacing-y-3 border-white w-full">
            {/* head */}
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
              {pendingSubmissions &&
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
                        onClick={openModal}
                        className="btn bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform"
                      >
                        Give Marks
                      </button>
                      <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg max-w-lg w-full shadow-lg"
                        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10"
                      >
                        <div>
                          <p className="mb-2">
                            <span className="font-bold">Google Docs Link:</span>{" "}
                            <a
                              target="_blank"
                              href={submission?.link}
                              className="text-primary underline"
                            >
                              {submission?.link}
                            </a>
                          </p>
                          <p className="mb-4">
                            <span className="font-bold">Note:</span>{" "}
                            {submission?.note}
                          </p>
                          <form
                            onSubmit={(e) =>
                              handleSubmit(
                                e,
                                submission?.examinee?.email,
                                submission?._id
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
                              <button className="btn bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-secondary transition-colors">
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </Modal>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

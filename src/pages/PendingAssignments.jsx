import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

export default function PendingAssignments() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data: pendingSubmissions, refetch } = useQuery({
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

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Assignment Title</th>
              <th>Assignment Marks</th>
              <th>Examinee Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingSubmissions &&
              pendingSubmissions?.map((submission, idx) => (
                <tr key={submission._id} className="hover">
                  <th>{idx + 1}</th>
                  <td>{submission.title}</td>
                  <td>{submission.assignmentMarks}</td>
                  <td>{submission?.examinee?.name}</td>
                  <td>
                    <button onClick={openModal} className="btn btn-secondary">
                      Give Marks
                    </button>
                    <Modal
                      isOpen={isModalOpen}
                      onRequestClose={closeModal}
                      contentLabel="Example Modal"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg max-w-lg w-full "
                      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10"
                    >
                      <div>
                        <p>
                          <span>Google Docs Link: </span>
                          <a target="_blank" href={submission?.link}>
                            {submission?.link}
                          </a>
                        </p>
                        <p>
                          <span>Note: </span>
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
                          className="card-body "
                        >
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Marks</span>
                            </label>
                            <input
                              type="number"
                              placeholder="marks"
                              name="marks"
                              className="input input-bordered"
                              required
                            />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Feedback</span>
                            </label>
                            <textarea
                              className="textarea textarea-bordered"
                              name="feedback"
                              placeholder="give feedback"
                            ></textarea>
                          </div>
                          <div className="form-control mt-6">
                            <button className="btn btn-secondary">
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
  );
}

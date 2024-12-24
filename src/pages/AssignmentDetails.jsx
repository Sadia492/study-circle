import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

export default function AssignmentDetails() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data: assignment, isLoading } = useQuery({
    queryKey: ["assignment"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/assignment/${id}`
      );

      return data;
    },
  });

  console.log(assignment);
  const { title, description, marks, image, difficulty, dueDate, creator } =
    assignment || {};

  // Safely destructure name and email from creator
  const { name, email } = creator || {};
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const link = form.link.value;
    const note = form.note.value;
    const formData = {
      title: title,
      status: "pending",
      link,
      note,
      examinee: {
        email: user?.email,
        name: user?.displayName,
      },
      assignmentMarks: marks,
      obtainedMarks: 0,
      feedback: "",
    };
    // console.log(formData);
    if (user?.email !== assignment?.creator?.email) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_URL}/add-submission`,
          formData
        );
        if (data.insertedId) {
          Swal.fire({
            title: "Success",
            text: "Assignment Submitted successfully",
            icon: "success",
          });
          closeModal();
        }
      } catch (err) {
        console.error("Error while posting data:", err);
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "The creator of the assignment can not submit the assignment.",
        icon: "error",
      });
      closeModal();
    }
  };

  return (
    <div className="mt-24">
      {/* {isLoading && <LoadingSpinner></LoadingSpinner>} */}
      <div className="flex lg:flex-row flex-col rounded-3xl mb-20 bg-base-100 gap-8 justify-center items-center p-8 shadow-xl w-11/12 mx-auto mt-20">
        <figure className="flex-1">
          <img className="w-full rounded-3xl" src={image} alt="Album" />
        </figure>
        <div className="flex-1 p-4">
          <h2 className="text-3xl font-bold ">{title}</h2>
          <p className=" text-gray-500 mb-6 mt-2">{description}</p>

          <p>
            <span className="font-bold">Total Marks: </span>
            {marks}
          </p>
          <div>
            <h3 className="font-bold text-lg mt-4">Other Info:</h3>
            <p>
              <span className="font-bold">Added By: </span>
              {name || "Not provided"}
            </p>
            <p>
              <span className="font-bold">User's Email: </span>
              {email || "No email provided"}
            </p>
          </div>
          <div className="space-x-2 my-4">
            <div className="badge bg-primary text-white p-3">{difficulty}</div>
            <div className="badge bg-secondary text-white p-3">
              {dueDate ? `Deadline: ${dueDate.split("T")[0]}` : "No due date"}
            </div>
          </div>
          <div className="card-actions justify-start">
            <button
              onClick={openModal}
              className="btn bg-gradient-to-r mt-3 from-primary to-secondary text-white"
            >
              Take Assignment
            </button>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg max-w-lg w-full "
              overlayClassName="fixed top-0 left-0 right-0 bottom-0  bg-black bg-opacity-50"
            >
              <form onSubmit={handleSubmit} className="card-body ">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Google Docs Link</span>
                  </label>
                  <input
                    type="url"
                    placeholder="google docs link"
                    name="link"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Quick Note Text</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    name="note"
                    placeholder="quick note"
                  ></textarea>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-secondary">Submit</button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

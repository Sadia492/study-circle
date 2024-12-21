import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function CreateAssignments() {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const marks = parseFloat(form.marks.value);
    const image = form.image.value;
    const difficulty = form.difficulty.value;
    const dueDate = startDate;

    const formData = {
      title,
      description,
      marks,
      image,
      difficulty,
      dueDate,
      creator: {
        email: user?.email,
        name: user?.displayName,
      },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/add-assignments`,
        formData
      );
      if (data.insertedId) {
        Swal.fire({
          title: "Assignment created",
          text: "Assignment Created successfully",
          icon: "success",
        });
      }
    } catch (err) {
      console.error("Error while posting data:", err);
    }
  };
  return (
    <div>
      <div className="card bg-base-100 w-full  shadow-2xl">
        <form
          onSubmit={handleSubmit}
          className="card-body grid grid-cols-1 md:grid-cols-2 gap-x-6"
        >
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered"
              placeholder="description"
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Marks</span>
            </label>
            <input
              type="number"
              name="marks"
              placeholder="marks"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Thumbnail Image URL</span>
            </label>
            <input
              type="text"
              name="image"
              placeholder="thumbnail"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Assignment Difficulty Level</span>
            </label>
            <select
              name="difficulty"
              className="select select-bordered w-full"
              required
              defaultValue="assignment difficulty level"
            >
              <option value="">assignment difficulty level</option>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Date</span>
            </label>
            <DatePicker
              className="w-full input input-bordered"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="form-control mt-6 md:col-span-2">
            <button className="btn btn-primary">Create Assignment</button>
          </div>
        </form>
      </div>
    </div>
  );
}

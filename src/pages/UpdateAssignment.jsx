import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function UpdateAssignment() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState();
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_URL}/assignment/${id}`
        );
        setAssignment(data);
        if (data.dueDate) {
          setStartDate(new Date(data.dueDate)); // Update startDate after fetch
        }
      } catch (error) {
        console.error("Error fetching assignment:", error);
      }
    };
    fetchData();
  }, [id]);

  const {
    title,
    _id,
    description,
    marks,
    image,
    difficulty,
    dueDate,
    creator,
  } = assignment || {};

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
    console.log(formData);
    // console.log(user?.email, creator.email);
    if (user?.email === assignment?.creator?.email) {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_URL}/update-assignment/${id}`,
          formData
        );
        if (data.modifiedCount) {
          Swal.fire({
            title: "Success",
            text: "Assignment Updated successfully",
            icon: "success",
          });
          navigate("/assignments");
        }
      } catch (err) {
        console.error("Error while posting data:", err);
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Only the creator of the assignment can update the assignment.",
        icon: "error",
      });
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
              defaultValue={title}
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
              defaultValue={description}
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
              defaultValue={marks}
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
              defaultValue={image}
              placeholder="thumbnail"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Assignment Difficulty Level</span>
            </label>
            {difficulty && (
              <select
                name="difficulty"
                className="select select-bordered w-full"
                required
                defaultValue={difficulty || "assignment difficulty level"}
              >
                <option value="">assignment difficulty level</option>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            )}
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
            <button className="btn btn-primary">Update Assignment</button>
          </div>
        </form>
      </div>
    </div>
  );
}

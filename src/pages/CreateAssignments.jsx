import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

export default function CreateAssignments() {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const marks = parseFloat(form.marks.value);
    const image = form.image.value;
    const difficulty = form.difficulty.value;
    const dueDate = startDate;
    if (description.length < 20) {
      return toast.error("Description should be at least 20 characters long");
    }

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
      const { data } = await axiosSecure.post(`/add-assignments`, formData);
      if (data.insertedId) {
        Swal.fire({
          title: "Assignment created",
          text: "Assignment Created successfully",
          icon: "success",
        });
        form.reset();
      }
    } catch (err) {
      toast.err(err.message);
    }
  };
  return (
    <div className="mt-24 text-center">
      <Helmet>
        <title>StudyCircle | Create</title>
      </Helmet>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary from-0 to-75% to-secondary text-transparent bg-clip-text">
        Create Assignments Now
      </h2>
      <p className="text-gray-400 mt-4 mx-auto lg:w-3/5">
        The Create Assignment page allows users to seamlessly design and add new
        assignments. It features a user-friendly form with a dropdown for
        difficulty selection and a date picker for setting deadlines.
      </p>

      {/* Decorative Background SVGs */}
      {/* top */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-20 left-10 w-60  animate-bounce hidden lg:flex"
        viewBox="0 0 512 512"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#BA1B1D", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#F8B200", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M269.723 232.29h-27.427c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.427c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10z"
          fill="url(#grad1)"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-20 left-[4.3rem] w-60  animate-bounce hidden lg:flex"
        viewBox="0 0 512 512"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#BA1B1D", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#F8B200", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M269.723 232.29h-27.427c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.427c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10z"
          fill="url(#grad1)"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-20 left-24 w-60  animate-bounce hidden lg:flex"
        viewBox="0 0 512 512"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#BA1B1D", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#F8B200", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M269.723 232.29h-27.427c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.427c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10z"
          fill="url(#grad1)"
        />
      </svg>
      {/* bottom */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-10 w-60 animate-bounce hidden lg:flex"
        viewBox="0 0 512 512"
      >
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#F8B200", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#BA1B1D", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M269.723 232.29h-27.427c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.427c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10z"
          fill="url(#grad2)"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-[4.3rem] w-60 animate-bounce hidden lg:flex"
        viewBox="0 0 512 512"
      >
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#F8B200", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#BA1B1D", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M269.723 232.29h-27.427c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.427c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10z"
          fill="url(#grad2)"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-24 w-60 animate-bounce hidden lg:flex"
        viewBox="0 0 512 512"
      >
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#F8B200", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#BA1B1D", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M269.723 232.29h-27.427c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.427c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10z"
          fill="url(#grad2)"
        />
      </svg>
      {/* Decorative SVG background (Stars) */}

      <div className="card lg:w-3/5 mx-auto ">
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
              className="input input-bordered "
              required
            />
          </div>
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered "
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
              className="input input-bordered "
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Thumbnail Image URL</span>
            </label>
            <input
              type="url"
              name="image"
              placeholder="thumbnail"
              className="input input-bordered "
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Assignment Difficulty Level</span>
            </label>
            <select
              name="difficulty"
              className="select select-bordered  w-full"
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
              className="w-full input input-bordered "
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="form-control mt-6 md:col-span-2">
            <button className="btn bg-gradient-to-r from-primary to-secondary text-white">
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

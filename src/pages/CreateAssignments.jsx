import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import bgHex from "../assets/bgImage2.jpg";

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
      toast.err(err.message);
    }
  };
  return (
    <div className="mt-24 text-center">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary from-0 to-75% to-secondary text-transparent bg-clip-text">
        Create Assignments Now
      </h2>
      <p className="text-gray-400 mt-4 mx-auto lg:w-3/5">
        The Create Assignment page allows users to seamlessly design and add new
        assignments. It features a user-friendly form with a dropdown for
        difficulty selection and a date picker for setting deadlines.
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        id="SvgjsSvg1237"
        width="200"
        height="200"
        x="0"
        y="0"
        className="absolute opacity-50 bottom-0 w-40"
        // style="enable-background:new 0 0 512 512"
        version="1.1"
        viewBox="0 0 512 512"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns:svgjs="http://svgjs.dev/svgjs"
      >
        <path
          d="M269.723 232.29h-27.427c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.427c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10zM192.296 77.437h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10V87.437c0-5.523-4.477-10-10-10zm25.02 357.134h52.407c5.523 0 10-4.477 10-10V319.717c0-5.523-4.477-10-10-10H164.868c-5.523 0-10 4.477-10 10V424.57c0 5.523 4.477 10 10 10h52.428l.02.001zm129.835-47.427h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10zm0-184.854c5.523 0 10-4.477 10-10V87.437c0-5.523-4.477-10-10-10H242.296c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h104.855zm-154.855 77.427c5.523 0 10-4.477 10-10V164.863c0-5.523-4.477-10-10-10H87.442c-5.523 0-10 4.477-10 10v104.853c0 5.523 4.477 10 10 10h104.854zm282.283 77.427h27.418c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10h-27.418c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10zm-387.137 0h27.427c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10H87.442c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10zm387.137-202.28c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h27.418c5.523 0 10-4.477 10-10V164.864c0-5.523-4.477-10-10-10h-27.418zm-87.428-40c0 5.523 4.477 10 10 10h104.846c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H397.151c-5.523 0-10 4.477-10 10v104.864zm37.428 242.28c5.523 0 10-4.477 10-10V242.29c0-5.523-4.477-10-10-10H319.723c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h104.856zM37.433 154.864h-27.43c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.43c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10zm387.146 0h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.478-10-10-10zm-269.71 319.707V502c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.429c0-5.523-4.477-10-10-10h-27.428c-5.523 0-10 4.477-10 10zm357.128-77.427c0-5.523-4.477-10-10-10H397.151c-5.523 0-10 4.477-10 10V502c0 5.523 4.477 10 10 10h104.846c5.523 0 10-4.477 10-10V397.144zm-279.701 77.429V502c0 5.523 4.477 10 10 10h104.855c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10H242.296c-5.523 0-10 4.477-10 10zM.003 397.147V502c0 5.523 4.477 10 10 10H114.86c5.523 0 10-4.477 10-10V397.147c0-5.523-4.477-10-10-10H10.003c-5.522 0-10 4.477-10 10zM37.429 232.29H10.003c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h27.426c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10zM217.296 47.437h52.427c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H164.869c-5.523 0-10 4.477-10 10v27.437c0 5.523 4.477 10 10 10h52.427zm139.855-10V10c0-5.523-4.477-10-10-10h-27.428c-5.523 0-10 4.477-10 10v27.437c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10zM.003 114.864c0 5.523 4.477 10 10 10H114.86c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H10.003c-5.523 0-10 4.477-10 10v104.864z"
          fill='url("#SvgjsLinearGradient1238")'
        ></path>
        <defs>
          <linearGradient
            gradientTransform="rotate(0 0.5 0.5)"
            id="SvgjsLinearGradient1238"
          >
            <stop
              stopOpacity=" 1"
              stopColor="rgba(186, 27, 29)"
              offset="0"
            ></stop>
            <stop
              stopOpacity=" 1"
              stopColor="rgba(248, 178, 0)"
              offset="1"
            ></stop>
          </linearGradient>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        id="SvgjsSvg1237"
        width="200"
        height="200"
        x="0"
        y="0"
        className="absolute opacity-50 top-60 right-0 w-40"
        // style="enable-background:new 0 0 512 512"
        version="1.1"
        viewBox="0 0 512 512"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns:svgjs="http://svgjs.dev/svgjs"
      >
        <path
          d="M269.723 232.29h-27.427c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.427c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10zM192.296 77.437h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10V87.437c0-5.523-4.477-10-10-10zm25.02 357.134h52.407c5.523 0 10-4.477 10-10V319.717c0-5.523-4.477-10-10-10H164.868c-5.523 0-10 4.477-10 10V424.57c0 5.523 4.477 10 10 10h52.428l.02.001zm129.835-47.427h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10zm0-184.854c5.523 0 10-4.477 10-10V87.437c0-5.523-4.477-10-10-10H242.296c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h104.855zm-154.855 77.427c5.523 0 10-4.477 10-10V164.863c0-5.523-4.477-10-10-10H87.442c-5.523 0-10 4.477-10 10v104.853c0 5.523 4.477 10 10 10h104.854zm282.283 77.427h27.418c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10h-27.418c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10zm-387.137 0h27.427c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10H87.442c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10zm387.137-202.28c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h27.418c5.523 0 10-4.477 10-10V164.864c0-5.523-4.477-10-10-10h-27.418zm-87.428-40c0 5.523 4.477 10 10 10h104.846c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H397.151c-5.523 0-10 4.477-10 10v104.864zm37.428 242.28c5.523 0 10-4.477 10-10V242.29c0-5.523-4.477-10-10-10H319.723c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h104.856zM37.433 154.864h-27.43c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.43c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10zm387.146 0h-27.428c-5.523 0-10 4.477-10 10v27.427c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.478-10-10-10zm-269.71 319.707V502c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10v-27.429c0-5.523-4.477-10-10-10h-27.428c-5.523 0-10 4.477-10 10zm357.128-77.427c0-5.523-4.477-10-10-10H397.151c-5.523 0-10 4.477-10 10V502c0 5.523 4.477 10 10 10h104.846c5.523 0 10-4.477 10-10V397.144zm-279.701 77.429V502c0 5.523 4.477 10 10 10h104.855c5.523 0 10-4.477 10-10v-27.427c0-5.523-4.477-10-10-10H242.296c-5.523 0-10 4.477-10 10zM.003 397.147V502c0 5.523 4.477 10 10 10H114.86c5.523 0 10-4.477 10-10V397.147c0-5.523-4.477-10-10-10H10.003c-5.522 0-10 4.477-10 10zM37.429 232.29H10.003c-5.523 0-10 4.477-10 10v104.854c0 5.523 4.477 10 10 10h27.426c5.523 0 10-4.477 10-10V242.29c0-5.522-4.477-10-10-10zM217.296 47.437h52.427c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H164.869c-5.523 0-10 4.477-10 10v27.437c0 5.523 4.477 10 10 10h52.427zm139.855-10V10c0-5.523-4.477-10-10-10h-27.428c-5.523 0-10 4.477-10 10v27.437c0 5.523 4.477 10 10 10h27.428c5.523 0 10-4.477 10-10zM.003 114.864c0 5.523 4.477 10 10 10H114.86c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H10.003c-5.523 0-10 4.477-10 10v104.864z"
          fill='url("#SvgjsLinearGradient1238")'
        ></path>
        <defs>
          <linearGradient
            gradientTransform="rotate(0 0.5 0.5)"
            id="SvgjsLinearGradient1238"
          >
            <stop
              stopOpacity=" 1"
              stopColor="rgba(186, 27, 29)"
              offset="0"
            ></stop>
            <stop
              stopOpacity=" 1"
              stopColor="rgba(248, 178, 0)"
              offset="1"
            ></stop>
          </linearGradient>
        </defs>
      </svg>
      <div className="card w-4/5 mx-auto">
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
              className="input input-bordered rounded-full"
              required
            />
          </div>
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered rounded-3xl"
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
              className="input input-bordered rounded-full"
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
              className="input input-bordered rounded-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Assignment Difficulty Level</span>
            </label>
            <select
              name="difficulty"
              className="select select-bordered rounded-full w-full"
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
              className="w-full input input-bordered rounded-full"
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

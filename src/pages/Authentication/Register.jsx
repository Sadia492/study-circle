import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import registerAnimation from "../../assets/animation/register.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
export default function Register() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createUser, setUser, updateUser, setLoading } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (!/[A-Z]/.test(password)) {
      return setError("Must have an Uppercase letter in the password ");
    }
    if (!/[a-z]/.test(password)) {
      return setError("Must have a Lowercase letter in the password");
    }
    if (password.length < 6) {
      return setError("Password length must be at least 6 character");
    }
    createUser(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Registration successful");
        navigate("/");
        updateUser({ displayName: name, photoURL: photo }).then(() => {});
      })
      .catch((error) => toast.error(error.code))
      .finally(() => setLoading(false));
    form.reset();
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center mt-28 w-11/12 mx-auto gap-12 items-center">
      <Helmet>
        <title>StudyCircle | Register</title>
      </Helmet>
      <div className="card bg-base-100 w-full flex-1 shrink-0 shadow-2xl">
        <form onSubmit={handleRegister} className="card-body">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary from-0 to-70% to-secondary text-transparent bg-clip-text text-center">
            REGISTER NOW
          </h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo Url</span>
            </label>
            <input
              type="url"
              name="photo"
              placeholder="Photo"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <label className="input input-bordered flex  justify-between items-center gap-2">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="password"
                className=""
                required
              />
              <button onClick={() => setShow(!show)} type="button" className="">
                {show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </button>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-gradient-to-r from-primary to-secondary text-white">
              Register
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <p className="text-center">
            Already have an account? Please{" "}
            <Link className="text-red-500 font-bold" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Lottie
          className="lg:w-4/5 "
          animationData={registerAnimation}
          loop={true}
        />
      </div>
    </div>
  );
}

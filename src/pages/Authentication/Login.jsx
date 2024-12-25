import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/animation/login.json";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithGoogle, signInUser, setUser } = useAuth();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // const data = { email, password };
    signInUser(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful");
        navigate(location?.state ? location?.state : "/");
      })
      .catch((error) => {
        toast.error(error.code);
      });
    form.reset();
  };
  const handleSignInWithGoogle = () => {
    signInWithGoogle().then(() => {
      navigate("/");
      toast.success("Login successful");
    });
  };
  return (
    <div className="flex justify-center items-center gap-12 mt-24 w-11/12 mx-auto">
      <Helmet>
        <title>StudyCircle | Login</title>
      </Helmet>
      <div className="card flex-1 w-full p-4  shadow-2xl">
        <div className="text-center btn bg-gradient-to-r from-primary to-secondary text-white">
          <button onClick={handleSignInWithGoogle} className="flex gap-3">
            <FaGoogle></FaGoogle> Sign In With Google
          </button>
        </div>
        <div className="divider">OR</div>
        <form onSubmit={handleLogin} className="card-body">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary from-0 to-75% to-secondary text-transparent bg-clip-text text-center">
            LOGIN HERE
          </h2>
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
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-gradient-to-r from-primary to-secondary text-white">
              Login
            </button>
          </div>
          <p className="text-center">
            Don't have an account? Please{" "}
            <Link className="text-red-500 font-bold" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
      <div className="flex-1">
        <Lottie animationData={loginAnimation} loop={true} />
      </div>
    </div>
  );
}

import React from "react";
import errorImg from "../assets/errorPage.jpg";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="lg:w-1/2 mx-auto">
        <img src={errorImg} alt="Error" />
      </div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary mb-6 to-secondary text-transparent bg-clip-text text-center">
        Page Not Found
      </h2>
      <div className="text-center">
        <button
          onClick={() => navigate("/")}
          className="btn bg-primary hover:bg-secondary text-white"
        >
          Bring Me To Home
        </button>
      </div>
    </div>
  );
}

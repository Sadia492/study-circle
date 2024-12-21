import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
export default function MainLayout() {
  return (
    <div className="w-11/12 mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Toaster />
    </div>
  );
}

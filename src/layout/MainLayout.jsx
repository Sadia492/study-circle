import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
export default function MainLayout() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-441.6px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <Toaster />
    </div>
  );
}

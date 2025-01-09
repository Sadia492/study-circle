import React from "react";
import logo from "../assets/book.png";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-base-300 text-base-content mt-12 border-t-2">
      <footer className="w-11/12 mx-auto footer py-16">
        <aside className="">
          <img className="w-16" src={logo} alt="" />
          <h2 className="font-bold text-2xl mb-2">StudyCircle</h2>
          <p className="font-bold">
            "Learn, collaborate, and grow together with our online <br /> group
            study platform – where friends become study partners."
          </p>
        </aside>
        <nav>
          <h6 className="text-xl font-bold">Get Help</h6>
          <Link to="/" className="hover:text-secondary">
            Home
          </Link>
          <Link to="/contact" className="hover:text-secondary">
            Contact Us
          </Link>
          <Link to="/about" className="hover:text-secondary">
            About
          </Link>
        </nav>

        <nav>
          <h6 className="text-xl font-bold">Contact Us</h6>
          <p className="">
            23 New Design Str,
            <br />
            10 Hudson Yards, USA
          </p>
          <p className="">Tel: + (123) 2500-567-8988</p>
          <p className="">Email: support@lms.com</p>
          <div className="flex flex-wrap  gap-4">
            <Link
              to="https://www.linkedin.com/in/sadia-afrin01/"
              target="_blank"
              href="/"
              className="text-2xl cursor-pointer hover:text-secondary"
            >
              <FaLinkedin />
            </Link>
            <Link
              target="_blank"
              to="https://www.instagram.com/"
              className=" text-2xl cursor-pointer hover:text-secondary"
            >
              <FaInstagram />
            </Link>

            <Link
              target="_blank"
              to="https://www.facebook.com/profile.php?id=100077898306645"
              className=" text-2xl cursor-pointer hover:text-secondary"
            >
              <FaFacebook />
            </Link>

            <Link
              to="https://twitter.com/"
              target="_blank"
              href="/"
              className=" text-2xl cursor-pointer hover:text-secondary"
            >
              <FaXTwitter />
            </Link>
          </div>
        </nav>
      </footer>
      <div className="footer-center border-t border-white text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            StudyCircle
          </p>
        </aside>
      </div>
    </div>
  );
}

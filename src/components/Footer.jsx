import React from "react";
import logo from "../assets/book.png";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
          <a className="hover:text-secondary">Contact Us</a>
          <a className="hover:text-secondary">Latest Articles</a>
          <a className="hover:text-secondary">FAQs</a>
        </nav>
        <nav>
          <h6 className="font-bold text-xl">Programs</h6>
          <a className="hover:text-secondary">Art & Design</a>
          <a className="hover:text-secondary">Business</a>
          <a className="hover:text-secondary">IT & Software</a>
          <a className="hover:text-secondary">Languages</a>
          <a className="hover:text-secondary">Programming</a>
        </nav>
        <nav>
          <h6 className="text-xl font-bold">Contact Us</h6>
          <a className="hover:text-secondary">
            23 New Design Str,
            <br />
            10 Hudson Yards, USA
          </a>
          <a className="hover:text-secondary">Tel: + (123) 2500-567-8988</a>
          <a className="hover:text-secondary">Email: support@lms.com</a>
          <div className="flex flex-wrap  gap-4">
            <a
              href="/"
              className=" text-2xl cursor-pointer hover:text-secondary"
            >
              <FaInstagram />
            </a>

            <a
              href="/"
              className=" text-2xl cursor-pointer hover:text-secondary"
            >
              <FaFacebook />
            </a>

            <a
              href="/"
              className=" text-2xl cursor-pointer hover:text-secondary"
            >
              <FaXTwitter />
            </a>

            <a
              href="/"
              className="text-2xl cursor-pointer hover:text-secondary"
            >
              <FaLinkedin />
            </a>
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

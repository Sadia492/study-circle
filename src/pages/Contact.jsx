import React, { useState } from "react";
import imgContact from "../assets/brand communication-amico.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form (handle backend submission)
    console.log(formData);
  };

  return (
    <div className=" flex flex-col justify-center mt-[5.5rem]">
      <div className=" shadow-lg w-11/12 mx-auto rounded-lg flex justify-center items-center flex-col-reverse lg:flex-row p-8">
        <div className=" w-full flex-1">
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg mb-8">
            Have any questions or suggestions? We'd love to hear from you!
          </p>

          {/* Contact Form */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-lg border b shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-lg border b shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-lg border b shadow-sm p-3  focus:outline-none focus:ring-2 focus:ring-secondary"
                rows="6"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn bg-gradient-to-r from-primary to-secondary text-white w-full"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex-1">
          {" "}
          <img src={imgContact} alt="" />{" "}
        </div>
      </div>
    </div>
  );
}

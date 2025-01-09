import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import aboutAnimation from "../assets/animation/aboutAnimation.json"; // A Lottie animation JSON file
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen  mt-12  ">
      {/* Header Section */}
      <div className="flex flex-col items-center text-white bg-gradient-to-r from-primary to-secondary justify-center py-12">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h1>
        <motion.p
          className="text-lg max-w-3xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to our platform! We are dedicated to connecting people with
          innovative ideas and causes that inspire them. Our goal is to empower
          individuals and organizations to make their dreams a reality.
        </motion.p>
        {/* Animation Section */}
        <motion.div
          className="flex justify-center my-10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Lottie animationData={aboutAnimation} loop={true} className="w-96" />
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-8 rounded-t-3xl shadow-lg">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg max-w-2xl mx-auto">
            We aim to bridge the gap between dreams and reality. By providing a
            seamless, secure, and innovative platform, we empower people to
            bring their ideas to life, solve real-world problems, and make an
            impact.
          </p>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-8">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <motion.img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="rounded-full w-32 mx-auto mb-4"
                whileHover={{ scale: 1.1 }}
              />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-sm">Founder & CEO</p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center">
              <motion.img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="rounded-full w-32 mx-auto mb-4"
                whileHover={{ scale: 1.1 }}
              />
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-sm">CTO</p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center">
              <motion.img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="rounded-full w-32 mx-auto mb-4"
                whileHover={{ scale: 1.1 }}
              />
              <h3 className="text-xl font-semibold">Sarah Johnson</h3>
              <p className="text-sm">Design Lead</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

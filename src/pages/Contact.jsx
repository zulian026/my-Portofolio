import React from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiSend,
  FiGithub,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";

const card = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 130, damping: 16 },
  },
};

export default function Contact() {
  const email = "zul@example.com";

  return (
    <div className="p-6 md:p-10 space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
        <p className="text-gray-600 mt-2 max-w-xl">
          Want to collaborate or just say hi? Send me a message — I’d love to
          connect.
        </p>
      </div>

      {/* Contact Card */}
      <motion.div
        variants={card}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 max-w-3xl mx-auto"
      >
        {/* Social Media */}
        <div className="flex justify-center gap-6 text-2xl text-gray-700 mb-8">
          <a
            href="#"
            className="p-3 border rounded-2xl hover:bg-gray-50 transition"
          >
            <FiGithub />
          </a>
          <a
            href="#"
            className="p-3 border rounded-2xl hover:bg-gray-50 transition"
          >
            <FiInstagram />
          </a>
          <a
            href="#"
            className="p-3 border rounded-2xl hover:bg-gray-50 transition"
          >
            <FiTwitter />
          </a>
        </div>

        {/* Form Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Send me a message
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Or email directly at <span className="text-blue-600">{email}</span>
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(
              "Form placeholder — connect to backend/email service to send."
            );
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Your name"
            required
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <input
            type="email"
            placeholder="Your email"
            required
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <input
            type="text"
            placeholder="Subject"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <textarea
            rows="5"
            placeholder="Type your message..."
            required
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-2xl font-medium shadow hover:brightness-110 transition flex items-center justify-center gap-2"
          >
            <FiSend />
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
}

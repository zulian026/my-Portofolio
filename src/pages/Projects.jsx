import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects } from "../data/projects";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function ProjectsPage() {
  return (
    <div className="p-6 md:p-10 space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Some of the things I've built — designed, developed, and shipped.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((p) => (
          <motion.div
            key={p.id}
            variants={card}
            className="bg-white rounded-3xl border border-gray-200  p-4 hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            {/* Project Image */}
            <div className="w-full h-48 bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="mt-5 space-y-3">
              {/* Title & icons */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {p.title}
                </h3>

                <div className="flex items-center gap-2">
                  <button className="p-2 border rounded-xl hover:bg-gray-100">
                    <FiGithub className="text-gray-700" />
                  </button>
                  <button className="p-2 border rounded-xl hover:bg-gray-100">
                    <FiExternalLink className="text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Divider line (seperti gambar) */}
              <div className="w-8 h-[2px] bg-gray-300 rounded-full"></div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {p.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs rounded-full border border-gray-300 text-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

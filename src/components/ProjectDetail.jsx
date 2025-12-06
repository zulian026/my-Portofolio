// ProjectDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { motion } from "framer-motion";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project)
    return (
      <div className="p-10">
        <p className="text-xl font-semibold">Project not found.</p>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-12 space-y-10 max-w-5xl mx-auto"
    >
      {/* Back Button */}
      <Link
        to="/projects"
        className="flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <FiArrowLeft /> Back to Projects
      </Link>

      {/* Image */}
      <div className="w-full h-80 bg-gray-100 rounded-3xl overflow-hidden shadow">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title & description */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
        <p className="text-gray-600 mt-3 leading-relaxed text-lg">
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-4 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded-full text-gray-800"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <a
          href={project.github || "#"}
          target="_blank"
          className="flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-gray-100"
        >
          <FiGithub /> View Source
        </a>

        <a
          href={project.demo || "#"}
          target="_blank"
          className="flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-gray-100"
        >
          <FiExternalLink /> Live Demo
        </a>
      </div>
    </motion.div>
  );
}

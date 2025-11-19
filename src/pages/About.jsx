import React from "react";
import { motion } from "framer-motion";

const photos = [
  {
    src: "https://picsum.photos/300/300?1",
    caption: "me coding",
    rotate: -8,
    offsetY: 0,
  },
  {
    src: "https://picsum.photos/300/300?2",
    caption: "workspace",
    rotate: 6,
    offsetY: 24, // akan terlihat naik/turun (zig-zag)
  },
  {
    src: "https://picsum.photos/300/300?3",
    caption: "travel",
    rotate: -3,
    offsetY: 0,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const cardVariants = {
  hidden: (custom) => ({
    opacity: 0,
    y: 18 + (custom.offsetY || 0),
    scale: 0.98,
    rotate: custom.rotate,
  }),
  show: (custom) => ({
    opacity: 1,
    y: custom.offsetY || 0,
    scale: 1,
    rotate: custom.rotate,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 18,
      mass: 0.6,
    },
  }),
};

export default function About() {
  return (
    <div className="p-6 md:p-10 space-y-14">
      {/* ---------------- About Description ---------------- */}
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">About Me</h1>
        <p className="text-gray-700 leading-relaxed">
          I'm <span className="font-semibold">Zulian Alhisyam</span>, a
          passionate software developer who loves building clean, minimalistic,
          and well-crafted digital experiences. I enjoy exploring new
          technologies, learning something new every day, and turning ideas into
          real, functional products.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Outside of coding, I love photography, reading, and traveling to new
          places. I believe that creativity and engineering should always go
          hand-in-hand.
        </p>
      </div>

      {/* ---------------- Polaroid Photos (Zig Zag with stagger) ---------------- */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-10 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {photos.map((p, idx) => (
          <motion.div
            key={p.src}
            className="bg-white p-2 rounded-lg shadow w-fit"
            custom={{ rotate: p.rotate, offsetY: p.offsetY }}
            variants={cardVariants}
            whileHover={{ scale: 1.03, y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <img
              src={p.src}
              alt={p.caption}
              className="w-40 h-40 object-cover rounded-md block"
            />
            <p className="text-center text-sm mt-2 italic">{p.caption}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ---------------- Student History Timeline ---------------- */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Student Journey
        </h2>

        <div className="border-l-2 border-gray-300 pl-6 space-y-8">
          {/* Step 1 */}
          <div>
            <div className="w-3 h-3 bg-gray-800 rounded-full -ml-[1.15rem]"></div>
            <h3 className="text-lg font-semibold text-gray-900">2015 - 2018</h3>
            <p className="text-gray-600">
              Started my early journey exploring programming basics and web
              development.
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <div className="w-3 h-3 bg-gray-800 rounded-full -ml-[1.15rem]"></div>
            <h3 className="text-lg font-semibold text-gray-900">2019 - 2022</h3>
            <p className="text-gray-600">
              Focused on building real projects, improving UI/UX design
              understanding, and joining community learning groups.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <div className="w-3 h-3 bg-gray-800 rounded-full -ml-[1.15rem]"></div>
            <h3 className="text-lg font-semibold text-gray-900">2023 - Now</h3>
            <p className="text-gray-600">
              Diving deep into full-stack development, modern frameworks, and
              real client projects.
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- Hobbies Section ---------------- */}
      <div className="space-y-6 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">My Hobbies</h2>
        <div className="flex flex-wrap gap-4 text-gray-700">
          <span className="px-4 py-2 bg-white shadow rounded-lg">
            Photography
          </span>
          <span className="px-4 py-2 bg-white shadow rounded-lg">Reading</span>
          <span className="px-4 py-2 bg-white shadow rounded-lg">
            Traveling
          </span>
          <span className="px-4 py-2 bg-white shadow rounded-lg">Gaming</span>
        </div>
      </div>

      {/* ---------------- Favorite Games ---------------- */}
      <div className="space-y-6 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">Favorite Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="font-semibold text-gray-800">GTA V</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="font-semibold text-gray-800">Valorant</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="font-semibold text-gray-800">Minecraft</p>
          </div>
        </div>
      </div>

      {/* ---------------- CV Section ---------------- */}
      <div className="bg-white shadow-sm rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">My CV</h2>
        <p className="text-gray-600">Here are multiple CV snapshots:</p>

        {/* CV Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img
            src="https://picsum.photos/500/700?cv1"
            className="w-[260px] h-[160px] object-cover mx-auto rounded-lg shadow"
            alt="cv1"
          />
          <img
            src="https://picsum.photos/500/700?cv2"
            className="w-[260px] h-[160px] object-cover mx-auto rounded-lg shadow"
            alt="cv2"
          />
          <img
            src="https://picsum.photos/500/700?cv3"
            className="w-[260px] h-[160px] object-cover mx-auto rounded-lg shadow"
            alt="cv3"
          />
          <img
            src="https://picsum.photos/500/700?cv4"
            className="w-[260px] h-[160px] object-cover mx-auto rounded-lg shadow"
            alt="cv4"
          />
          <img
            src="https://picsum.photos/500/700?cv5"
            className="w-[260px] h-[160px] object-cover mx-auto rounded-lg shadow"
            alt="cv5"
          />
          <img
            src="https://picsum.photos/500/700?cv6"
            className="w-[260px] h-[160px] object-cover mx-auto rounded-lg shadow"
            alt="cv6"
          />
        </div>
      </div>
    </div>
  );
}

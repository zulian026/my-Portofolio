import { FiGithub, FiInstagram, FiTwitter } from "react-icons/fi";
import { motion } from "framer-motion";

const photos = [
  {
    src: "https://i.pravatar.cc/280",
    caption: "bali!!",
    rotate: -3,
  },
  {
    src: "https://picsum.photos/300/200?2",
    caption: "bookies",
    rotate: 2,
  },
  {
    src: "https://picsum.photos/300/200?3",
    caption: "beach :3",
    rotate: -1,
  },
  {
    src: "https://picsum.photos/300/200?4",
    caption: "gang",
    rotate: 3,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: (custom) => ({
    opacity: 0,
    y: 18,
    scale: 0.98,
    rotate: custom.rotate, // start with target rotate (keeps consistent)
  }),
  show: (custom) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: custom.rotate, // keep rotation constant
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 18,
      mass: 0.6,
    },
  }),
};

export default function Home() {
  return (
    <div className="p-6 md:p-10 space-y-10">
      {/* ---------------- Profile Header ---------------- */}
      <div className="space-y-3">
        {/* Name + Verified */}
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-900">Zulian Alhisyam</h1>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
            className="w-5 h-5"
            alt="verified"
          />
        </div>

        <p className="text-gray-600 text-sm">Software Developer </p>

        {/* Bio */}
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          I'm a software developer from{" "}
          <span className="font-semibold">Indonesia</span>. A minimalist design
          enjoyer. In my free time, I love exploring new places, learning
          something new, and working on creative things.
        </p>
      </div>

      {/* ---------------- Polaroid Photos (with staggered animation) ---------------- */}
      <motion.div
        className="flex gap-6 overflow-x-auto py-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="show" // animates when scrolled into view
        viewport={{ once: true, amount: 0.3 }}
      >
        {photos.map((p, i) => (
          <motion.div
            key={p.src}
            className="bg-white p-2 rounded-lg shadow w-fit"
            variants={cardVariants}
            custom={{ rotate: p.rotate }}
            // small hover pop for polish
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <img
              src={p.src}
              className="w-32 h-32 object-cover rounded-md block"
              alt={p.caption}
            />
            <p className="text-center text-sm mt-2 italic">{p.caption}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ---------------- Stats ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Projects */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm">Total Projects</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
          <p className="text-xs text-green-600 mt-1">+2 this month</p>
        </div>

        {/* Skills */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm">Skills</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
          <p className="text-xs text-blue-600 mt-1">Updated recently</p>
        </div>

        {/* CV */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm">CV</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">4</p>
          <p className="text-xs text-purple-600 mt-1">Updated recently</p>
        </div>

        {/* Social Media */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm">Social Media</h3>
          <div className="flex gap-4 text-2xl mt-2 text-gray-700">
            <FiGithub className="hover:text-black transition" />
            <FiInstagram className="hover:text-pink-500 transition" />
            <FiTwitter className="hover:text-blue-500 transition" />
          </div>
        </div>
      </div>
    </div>
  );
}

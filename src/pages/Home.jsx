import { useEffect, useState } from "react";
import {
  FiGithub,
  FiInstagram,
  FiTwitter,
  FiExternalLink,
  FiGitBranch,
  FiCode,
  FiCoffee,
  FiEye,
  FiDownload,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import FunFactsSection from "../components/FunFactsSection";

// Default fallback jika tabel Supabase kosong
const defaultPhotos = [
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
    rotate: custom.rotate,
  }),
  show: (custom) => ({
    opacity: 1,
    y: 0,
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

export default function Home() {
  const [photos, setPhotos] = useState(defaultPhotos);
  const [funFacts, setFunFacts] = useState([]);
  const [currently, setCurrently] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState([]);

  // Ambil data dari Supabase
  useEffect(() => {
    async function fetchPhotos() {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching photos:", error.message);
        return;
      }

      if (data && data.length > 0) {
        setPhotos(
          data.map((p) => ({
            src: p.src,
            caption: p.caption,
            rotate: p.rotate ?? 0,
          }))
        );
      }
    }

    async function fetchFunFacts() {
      const { data, error } = await supabase
        .from("funfacts")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching fun facts:", error.message);
        return;
      }

      setFunFacts(data);
    }

    async function fetchCurrently() {
      const { data, error } = await supabase
        .from("currently")
        .select("*")
        .order("id", { ascending: true });

      if (!error && data) {
        setCurrently(data);
      }
    }

    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: true });

      if (!error && data) {
        setProjects(data);
      }
    }

    async function fetchStats() {
      const { data, error } = await supabase
        .from("stats")
        .select("*")
        .order("id", { ascending: true });

      if (!error && data) {
        setStats(data);
      }
    }

    fetchFunFacts();
    fetchPhotos();
    fetchCurrently();
    fetchProjects();
    fetchStats();
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-10 ml-5 ">
      {/* ---------------- Grid Background (Top Half Only) ---------------- */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
      linear-gradient(to right, #e5e7eb 1px, transparent 1px),
      linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
    `,
          backgroundSize: "30px 30px",

          // Bagian yang bikin halus:
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      />

      {/* ---------------- Profile Header ---------------- */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-900">Zulian Alhisyam</h1>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
            className="w-5 h-5"
            alt="verified"
          />
        </div>

        <p className="text-gray-600 text-sm">Software Developer</p>

        <p className="text-gray-700 leading-relaxed max-w-2xl">
          I'm a software developer from{" "}
          <span className="font-semibold">Indonesia</span>. A minimalist design
          enjoyer. In my free time, I love exploring new places, learning
          something new, and working on creative things.
        </p>
      </div>

      {/* ---------------- Polaroid Photos ---------------- */}
      <motion.div
        className="flex gap-6 overflow-x-auto py-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {photos.map((p, i) => (
          <motion.div
            key={i}
            className="bg-white p-2 rounded-lg shadow w-fit"
            variants={cardVariants}
            custom={{ rotate: p.rotate }}
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

      {/* ---------------- Stats Section ---------------- */}
      {stats.length > 0 && (
        <motion.div
          className="mt-14 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-900">Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md border border-gray-100"
                whileHover={{ y: -4, shadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ---------------- Social Media Compact Badge ---------------- */}
      <motion.div
        className="flex items-center  mt-6"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        {/* Text kiri */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-700 tracking-wide">
            Find me on
          </p>
          <span className="text-gray-500">→</span>
        </div>

        {/* Icons badge */}
        <div className="flex items-center gap-2 ml-10">
          <a
            href="https://github.com/zulian026"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full  hover:-translate-y-0.5 transition-all"
          >
            <FiGithub className="text-lg text-gray-700" />
            <span className="text-sm text-gray-700">GitHub</span>
          </a>

          <a
            href="https://instagram.com/zyanx_04"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full  hover:-translate-y-0.5 transition-all"
          >
            <FiInstagram className="text-lg text-gray-700" />
            <span className="text-sm text-gray-700">Instagram</span>
          </a>

          <a
            href="https://twitter.com/zulian"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full  hover:-translate-y-0.5 transition-all"
          >
            <FiTwitter className="text-lg text-gray-700" />
            <span className="text-sm text-gray-700">Twitter</span>
          </a>
        </div>
      </motion.div>
      <FunFactsSection funFacts={funFacts} />
    </div>
  );
}

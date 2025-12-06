import { motion } from "framer-motion";
import {
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiMysql,
  SiSupabase,
  SiLaravel,
  SiPython,
} from "react-icons/si";

const stack = [
  { icon: <SiJavascript />, name: "JavaScript", color: "#f7df1e" },
  { icon: <SiReact />, name: "React", color: "#61dafb" },
  { icon: <SiTailwindcss />, name: "TailwindCSS", color: "#38bdf8" },
  { icon: <SiNodedotjs />, name: "Node.js", color: "#5fa04e" },
  { icon: <SiMysql />, name: "MySQL", color: "#00618a" },
  { icon: <SiSupabase />, name: "Supabase", color: "#3ecf8e" },
  { icon: <SiLaravel />, name: "Laravel", color: "#ff2d20" },
  { icon: <SiPython />, name: "Python", color: "#306998" },
];

export default function TechStack() {
  return (
    <div className="mt-16 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Tech Stack</h2>
      <p className="text-gray-600 text-sm">Tools & technologies I use</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
        {stack.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.08, y: -4 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 12,
              delay: i * 0.05,
            }}
            className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5 flex flex-col items-center gap-3 hover:shadow-lg hover:border-gray-200 cursor-default"
          >
            <div className="text-4xl drop-shadow" style={{ color: item.color }}>
              {item.icon}
            </div>
            <p className="text-sm font-medium text-gray-700">{item.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

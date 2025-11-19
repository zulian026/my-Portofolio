import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiUser,
  FiGrid,
  FiBook,
  FiMail,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const links = [
  { to: "/", text: "Home", icon: <FiHome /> },
  { to: "/about", text: "About", icon: <FiUser /> },
  { to: "/skills", text: "Skills", icon: <FiGrid /> },
  { to: "/projects", text: "Projects", icon: <FiBook /> },
  { to: "/contact", text: "Contact", icon: <FiMail /> },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const [switchOn, setSwitchOn] = React.useState(false);

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        width: collapsed ? 80 : 260,
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-white border-r border-gray-200 h-screen sticky top-0 overflow-hidden "
    >
      <div className="h-full flex flex-col justify-between">
        {/* ---------------------- TOP AREA ---------------------- */}
        <div>
          {/* Collapse Button */}
          {/* -------- Collapse Button (NEW STYLE) -------- */}
          <div className="flex justify-end p-6 mt-3 mb-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setCollapsed(!collapsed)}
              className="
      w-10 h-10 flex items-center justify-center 
      rounded-full 
      bg-white/60 backdrop-blur-md 
      border border-gray-200 
      shadow-sm
      hover:bg-white 
      transition-all
    "
            >
              {collapsed ? (
                <FiChevronRight className="text-xl text-gray-700" />
              ) : (
                <FiChevronLeft className="text-xl text-gray-700" />
              )}
            </motion.button>
          </div>

          {/* Profile */}
          <motion.div
            animate={{ opacity: collapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="px-4 mb-6 flex items-center gap-3"
          >
            <img
              src="https://i.pinimg.com/474x/d2/50/ec/d250ec8308cb6b5ed36683d5d5f44100.jpg"
              className="w-10 h-10 rounded-full object-cover"
              alt="profile"
            />

            {!collapsed && (
              <div>
                <h2 className="font-semibold text-gray-800">John Doe</h2>
                <p className="text-sm text-gray-500">Frontend Developer</p>
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <nav className="mt-2 space-y-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `
                    relative group flex items-center rounded-lg mx-3 px-4 py-3 
                    text-base font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary text-gray-900 shadow-sm"
                        : "hover:bg-gray-100 text-gray-700"
                    }
                  `
                }
              >
                <span className="text-2xl">{l.icon}</span>

                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-4 tracking-wide"
                  >
                    {l.text}
                  </motion.span>
                )}

                {/* Tooltip saat collapsed */}
                {collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute left-20 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg 
                    opacity-0 group-hover:opacity-100 transition z-50 whitespace-nowrap"
                  >
                    {l.text}
                  </motion.span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

       
      </div>
    </motion.aside>
  );
}

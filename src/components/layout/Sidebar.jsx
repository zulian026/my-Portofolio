import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiUser, FiGrid, FiBook, FiMail } from "react-icons/fi";

const links = [
  { to: "/", text: "Home", icon: <FiHome /> },
  { to: "/about", text: "About", icon: <FiUser /> },
  { to: "/skills", text: "Skills", icon: <FiGrid /> },
  { to: "/projects", text: "Projects", icon: <FiBook /> },
  { to: "/contact", text: "Contact", icon: <FiMail /> },
];

export default function Sidebar() {
  return (
    <>
      {/* ---------- Desktop Sidebar (Icons-only) ---------- */}
      <motion.aside
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="hidden md:flex bg-gray-50 border-r border-gray-200 h-screen sticky top-0 w-20 z-50"
      >
        <div className="h-full flex flex-col justify-center py-6 w-full">
          {/* Navigation Icons Only */}
          <nav className="space-y-4 flex flex-col items-center justify-center h-full">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `
                  group relative flex items-center justify-center
                  w-12 h-12 rounded-xl text-2xl transition-all
                  ${
                    isActive
                      ? "bg-gray-200 text-gray-900 shadow-sm"
                      : "hover:bg-gray-100 text-gray-700"
                  }
                `}
              >
                {l.icon}

                <span className="absolute left-16 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
                  {l.text}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.aside>

      {/* ---------- Mobile Bottom Bar (Icons-only) ---------- */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 shadow-lg"
      >
        <div className="flex items-center justify-around px-4 py-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `
                flex flex-col items-center justify-center
                w-14 h-14 rounded-xl text-2xl transition-all
                ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              {l.icon}
              <span className="text-xs mt-1 font-medium">{l.text}</span>
            </NavLink>
          ))}
        </div>
      </motion.nav>
    </>
  );
}

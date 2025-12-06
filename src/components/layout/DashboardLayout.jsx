// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FiMenu, FiLogOut } from "react-icons/fi";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // ---------------- LOGOUT FUNCTION ----------------
  const handleLogout = () => {
    localStorage.removeItem("token"); // hapus token login
    navigate("/login"); // redirect ke halaman login
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* -------- Sidebar (Fixed) -------- */}
      <aside
        className={`bg-white shadow-sm h-screen p-6 transition-all duration-300 fixed left-0 top-0 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header Logo */}
        <div className="text-2xl font-bold mb-8 text-gray-900">
          {collapsed ? "DB" : "Dashboard"}
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          <a
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            <span className="text-xl">🏠</span>
            {!collapsed && <span className="font-medium">Dashboard</span>}
          </a>

          <a
            href="/dashboard/photos"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            <span className="text-xl">📷</span>
            {!collapsed && <span className="font-medium">Photos Home</span>}
          </a>
          <a
            href="/dashboard/funfacts"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            <span className="text-xl">💡</span>
            {!collapsed && <span className="font-medium">Funfacts</span>}
          </a>
        </nav>
      </aside>

      {/* -------- Main Content Area (dengan margin kiri sesuai sidebar) -------- */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Topbar (Fixed) */}
        <header className="h-16 bg-white shadow-sm flex items-center px-6 justify-between sticky top-0 z-10">
          {/* Button Collapse */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-700"
          >
            <FiMenu className="text-xl" />
          </button>

          {/* Profile + Logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-900">Zulian</span>
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-10 h-10 rounded-full shadow-sm"
              />
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition shadow-sm"
            >
              <FiLogOut /> <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Content (Scrollable) */}
        <main className="p-6 md:p-10 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

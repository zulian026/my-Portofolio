// App.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PhotoManager from "./pages/dashboard/PhotoManager";
import FunFactsManager from "./pages/dashboard/FunFactsManager";
import ChatBotButton from "./components/chat/ChatBotButton";
import ChatWindow from "./components/chat/ChatWindow";
import ScrollToTop from "./components/ScrollToTop";
import ProjectDetail from "./components/ProjectDetail";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [chatOpen, setChatOpen] = useState(false);

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex">
      <ScrollToTop />
      {/* Sidebar Website */}
      {!hideSidebar && (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}

      {/* Content Wrapper */}
      <div
        className={
          "flex-1 min-h-screen " +
          (location.pathname === "/login"
            ? "flex items-center justify-center"
            : "")
        }
      >
        <Routes>
          {/* ---- Website Routes ---- */}
          <Route
            path="*"
            element={
              <main className="p-6 md:p-10 w-full">
                <div className="container-max mx-auto">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                  </Routes>
                </div>
                <ChatWindow
                  isOpen={chatOpen}
                  onClose={() => setChatOpen(false)}
                />
                <ChatBotButton onClick={() => setChatOpen(true)} />
              </main>
            }
          />

          {/* ---- Dashboard Routes (FULL PAGE) ---- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="/dashboard/photos" element={<PhotoManager />} />
            <Route path="/dashboard/funfacts" element={<FunFactsManager />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

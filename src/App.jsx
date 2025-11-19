import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-800 flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex-1 min-h-screen">
        <main className="p-6 md:p-10">
          <div className="container-max mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

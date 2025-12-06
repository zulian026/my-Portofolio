import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNode,
  FaGitAlt,
  FaFigma,
} from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiExpress, SiPython } from "react-icons/si";

// Jika Anda masih mengimpor dari ../data/skills, tetap bisa.
// import { skills as importedSkills } from "../data/skills";

// Contoh categorizedSkills (angka = persen)
const categorizedSkills = {
  Frontend: [
    { name: "HTML", level: 90, icon: <FaHtml5 /> },
    { name: "CSS", level: 85, icon: <FaCss3Alt /> },
    { name: "JavaScript", level: 80, icon: <FaJs /> },
    { name: "React", level: 75, icon: <FaReact /> },
    { name: "TailwindCSS", level: 70, icon: <SiTailwindcss /> },
  ],

  Backend: [
    { name: "Node.js", level: 70, icon: <FaNode /> },
    { name: "Express.js", level: 65, icon: <SiExpress /> },
    { name: "MongoDB", level: 60, icon: <SiMongodb /> },
    { name: "Python", level: 75, icon: <SiPython /> },
  ],

  Tools: [
    { name: "Git", level: 85, icon: <FaGitAlt /> },
    { name: "Figma", level: 80, icon: <FaFigma /> },
  ],

  "Soft Skills": [
    { name: "Communication", level: 90 },
    { name: "Problem Solving", level: 85 },
    { name: "Teamwork", level: 90 },
  ],
};

// Jika Anda punya array skills terpisah dengan level sebagai string,
// contoh:
// export const skills = [
//   { name: "React", level: "Expert" },
//   { name: "TypeScript", level: "Intermediate" },
// ];
// Fungsi berikut mengkonversi level teks ke persentase.
function levelToPercent(level) {
  if (typeof level === "number") return Math.max(0, Math.min(100, level));
  if (!level) return 0;
  const key = String(level).toLowerCase();
  if (key.includes("expert")) return 95;
  if (key.includes("advanced")) return 80;
  if (key.includes("intermediate")) return 65;
  if (key.includes("beginner")) return 40;
  // fallback: jika ada angka di string
  const match = key.match(/(\d{1,3})/);
  if (match) {
    const n = parseInt(match[1], 10);
    return Math.max(0, Math.min(100, n));
  }
  return 60;
}

export default function SkillsPage({ extraSkills = [] }) {
  // extraSkills bisa dipakai jika Anda mengimpor dari ../data/skills — pass via props
  // contoh: <SkillsPage extraSkills={importedSkills} />
  return (
    <div className="p-6 md:p-10 space-y-12">
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
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Skills</h1>
        <p className="text-gray-600 mt-2">
          Technologies, tools, and soft skills I'm experienced with.
        </p>
      </div>

      {/* Render setiap kategori */}
      {Object.entries(categorizedSkills).map(([category, items]) => (
        <section key={category} className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">{category}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((skill) => {
              const percent = levelToPercent(skill.level);
              return (
                <div
                  key={skill.name}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {skill.icon && (
                        <div className="text-2xl text-gray-700">
                          {skill.icon}
                        </div>
                      )}
                      <div className="text-lg font-semibold text-gray-800">
                        {skill.name}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {percent}%
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${percent}%`,
                          background:
                            "linear-gradient(90deg, rgba(59,130,246,1) 0%, rgba(99,102,241,1) 100%)",
                        }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">
                        {typeof skill.level === "number"
                          ? `${skill.level}%`
                          : skill.level || `${percent}%`}
                      </p>
                      <p className="text-xs text-gray-400">{/* reserved */}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* Jika ada extraSkills (mis. dari ../data/skills) tampilkan juga */}
      {extraSkills.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Other Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {extraSkills.map((s) => {
              const percent = levelToPercent(s.level);
              return (
                <div
                  key={s.name}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-gray-800">
                      {s.name}
                    </div>
                    <div className="text-sm text-gray-500">{percent}%</div>
                  </div>

                  <div className="mt-3">
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${percent}%`,
                          background:
                            "linear-gradient(90deg, rgba(59,130,246,1) 0%, rgba(99,102,241,1) 100%)",
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{s.level}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

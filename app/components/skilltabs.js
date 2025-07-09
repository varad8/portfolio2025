"use client";

import { useState } from "react";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaAngular,
  FaDatabase,
  FaAndroid,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiExpress,
  SiNodedotjs,
  SiVite,
  SiMongodb,
  SiFirebase,
  SiMysql,
  SiElegoo,
  SiGooglesheets,
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion"; // Add motion import

const skillTabs = [
  { label: "Web Development", value: "web" },
  { label: "App Development", value: "app" },
  { label: "Database", value: "db" },
  { label: "Software Development", value: "soft" },
  { label: "Data Entry", value: "data" },
];

const skills = {
  web: [
    { name: "React.js", icon: <FaReact />, color: "#61DBFB", progress: 95 },
    { name: "HTML", icon: <FaHtml5 />, color: "#e34c26", progress: 99 },
    { name: "CSS", icon: <FaCss3Alt />, color: "#264de4", progress: 85 },
    { name: "Next.js", icon: <SiNextdotjs />, color: "#000000", progress: 80 },
    { name: "Vite", icon: <SiVite />, color: "#646CFF", progress: 70 },
    { name: "AngularJS", icon: <FaAngular />, color: "#DD1B16", progress: 55 },
    { name: "Node.js", icon: <FaNodeJs />, color: "#3C873A", progress: 75 },
    {
      name: "Express.js",
      icon: <SiNodedotjs />,
      color: "#000000",
      progress: 70,
    },
  ],
  app: [
    {
      name: "Android Studio",
      icon: <FaAndroid />,
      color: "#3DDC84",
      progress: 90,
    },
  ],
  db: [
    { name: "MySQL", icon: <SiMysql />, color: "#00758F", progress: 70 },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", progress: 92 },
    { name: "Firebase", icon: <SiFirebase />, color: "#FFA000", progress: 98 },
  ],
  soft: [
    { name: "VB.NET", icon: <SiElegoo />, color: "#512BD4", progress: 50 },
  ],
  data: [
    {
      name: "Google Sheets",
      icon: <SiGooglesheets />,
      color: "#0F9D58",
      progress: 90,
    },
  ],
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
  exit: { opacity: 0, y: 40, transition: { duration: 0.3 } },
};

export default function SkillTabs() {
  const [activeTab, setActiveTab] = useState("web");

  return (
    <section className="bg-white py-12 px-4 md:px-20 overflow-hidden">
      <h2 className="text-4xl font-bold text-slate-dark mb-8 text-center">
        My Skills
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {skillTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              activeTab === tab.value
                ? "bg-orange-accent text-white"
                : "border-orange-accent text-orange-accent"
            } transition`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards with motion */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <AnimatePresence mode="wait">
          {skills[activeTab].map((skill, idx) => (
            <motion.div
              key={skill.name}
              className="relative group p-6 bg-gradient-to-br from-white via-light-gray to-slate-100 rounded-2xl shadow-xl flex flex-col items-center text-center border border-orange-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              {/* Decorative Glow */}
              <div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-30 blur-2xl pointer-events-none"
                style={{ background: skill.color }}
              />
              {/* Icon with ring */}
              <div className="mb-4 flex items-center justify-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-lg border-4 border-orange-accent group-hover:scale-110 transition-transform duration-300"
                  style={{ boxShadow: `0 4px 24px 0 ${skill.color}33` }}
                >
                  <span className="text-3xl" style={{ color: skill.color }}>
                    {skill.icon}
                  </span>
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2 text-slate-dark group-hover:text-orange-accent transition-colors duration-300">
                {skill.name}
              </h4>
              {/* Progress Bar with label */}
              <div className="w-full mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-mid-gray">Skill Level</span>
                  <span className="text-xs font-semibold text-orange-accent">
                    {skill.progress}%
                  </span>
                </div>
                <div className="w-full h-3 bg-soft-gray rounded-full overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${skill.progress}%`,
                      background: `linear-gradient(90deg, ${skill.color} 60%, #fff 100%)`,
                    }}
                  ></div>
                </div>
              </div>
              <p className="text-xs mt-3 text-mid-gray italic">
                {skill.progress >= 90
                  ? "Expert"
                  : skill.progress >= 75
                  ? "Advanced"
                  : skill.progress >= 60
                  ? "Intermediate"
                  : "Beginner"}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

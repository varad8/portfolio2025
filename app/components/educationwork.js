"use client";

import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";
// Add Google Font import
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// 🎓 Education Data
const educationData = [
  {
    year: "2019 – 2022",
    title: "Diploma in Computer Engineering",
    subtitle: "Diploma Completed with 87.71 %",
  },
  {
    year: "2018 – 2019",
    title: "Secondary School Certificate",
    subtitle: "10th Passed with 78.60 %",
  },
];

// 💼 Work Experience Data
const experienceData = [
  {
    year: "Jan 2025 – Present",
    title: "Chainsys Pvt Ltd | Ratnagiri",
    subtitle: "Data Entry Operator",
  },
  {
    year: "Mar 2023 – Present",
    title: "Self-Employed",
    subtitle: "Developer and CSC Operator",
  },
  {
    year: "Dec 2022 – Feb 2023",
    title: "Andromeda Mumbai",
    subtitle: "Office Assitant",
  },
  {
    year: "Aug 2022 – Nov 2022",
    title: "Shri Mahalaxmi Mini Mall 49 & 99 | Ratnagiri",
    subtitle: "Sales Executive/Sales Person",
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function EducationWork() {
  return (
    <section
      className={`bg-white w-full overflow-hidden py-16 px-6 md:px-20 ${inter.className}`}
    >
      <div className="text-center mb-12">
        <h4 className="text-[var(--color-orange-accent)] font-medium text-sm md:text-base">
          — Education & Work
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          My{" "}
          <span className="text-[var(--color-orange-accent)] font-semibold italic">
            Academic and
          </span>{" "}
          <span className="text-[var(--color-dark)]">Professional Journey</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Education Timeline */}
        <div className="bg-gradient-to-br from-white via-[#f8f9fa] to-[#f3f4f6] p-8 rounded-3xl shadow-lg border border-orange-100 relative overflow-hidden">
          {/* Decorative Accent */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-orange-accent)] opacity-10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[var(--color-orange-accent)] text-white p-3 rounded-full shadow-lg">
              <FaGraduationCap className="text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-dark)] tracking-wide">
              Education
            </h3>
          </div>

          <div className="relative border-l-4 border-[var(--color-orange-accent)] pl-8 space-y-10">
            {educationData.map((edu, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-5 top-2 w-5 h-5 rounded-full bg-[var(--color-orange-accent)] border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-300" />
                <div className="bg-white/80 rounded-xl p-4 shadow group-hover:shadow-lg transition-all duration-300">
                  <p className="text-xs font-semibold text-[var(--color-orange-accent)] mb-1 tracking-wide">
                    {edu.year}
                  </p>
                  <h4 className="font-bold text-lg text-[var(--color-dark)] mb-1 group-hover:text-[var(--color-orange-accent)] transition-colors duration-300">
                    {edu.title}
                  </h4>
                  <p className="text-sm text-[var(--color-dark-gray)]">
                    {edu.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Work Experience Timeline */}
        <div className="bg-gradient-to-br from-white via-[#f8f9fa] to-[#f3f4f6] p-8 rounded-3xl shadow-lg border border-orange-100 relative overflow-hidden">
          {/* Decorative Accent */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--color-orange-accent)] opacity-10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[var(--color-orange-accent)] text-white p-3 rounded-full shadow-lg">
              <FaBriefcase className="text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-dark)] tracking-wide">
              Work Experience
            </h3>
          </div>

          <div className="relative border-l-4 border-[var(--color-orange-accent)] pl-8 space-y-10">
            {experienceData.map((exp, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-5 top-2 w-5 h-5 rounded-full bg-[var(--color-orange-accent)] border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-300" />
                <div className="bg-white/80 rounded-xl p-4 shadow group-hover:shadow-lg transition-all duration-300">
                  <p className="text-xs font-semibold text-[var(--color-orange-accent)] mb-1 tracking-wide">
                    {exp.year}
                  </p>
                  <h4 className="font-bold text-lg text-[var(--color-dark)] mb-1 group-hover:text-[var(--color-orange-accent)] transition-colors duration-300">
                    {exp.title}
                  </h4>
                  <p className="text-sm text-[var(--color-dark-gray)]">
                    {exp.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

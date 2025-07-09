// components/AboutMeSection.jsx

"use client";
import Image from "next/image";
import { motion } from "framer-motion";
// Add Google Font import
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function AboutMeSection() {
  return (
    <section
      className={`w-full overflow-hidden  bg-[var(--color-slate-dark)] text-[var(--color-light-gray)] py-12 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10 ${poppins.className}`}
    >
      {/* Left - Profile Image with Circle BG behind */}
      <motion.div
        className="relative w-[300px] md:w-[400px] h-[380px] md:h-[480px] flex items-end justify-center"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true }}
      >
        {/* Circle BG */}
        <motion.div
          className="absolute bottom-0 w-[280px] md:w-[360px] h-[280px] md:h-[360px] bg-[var(--color-orange-accent)] rounded-full z-0"
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
          viewport={{ once: true }}
        />

        {/* Image Overlapping Top */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <Image
            src="/images/heroimgvaradai.png"
            alt="Profile"
            width={400}
            height={400}
            className="w-[260px] md:w-[320px] object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Right Content */}
      <motion.div
        className="text-center md:text-left space-y-4 md:space-y-6 max-w-xl"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h4 className="text-[var(--color-orange-accent)] font-medium text-lg">
          — About Me
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Who is{" "}
          <span className="text-[var(--color-orange-accent)]">
            Varad Nikharage?
          </span>
        </h2>
        <p className="text-[var(--color-soft-gray)] text-sm md:text-base">
          I am a passionate developer with a keen eye for detail. I specialize
          in creating stunning web experiences using modern technologies like
          Next.js, React, and Tailwind CSS. My goal is to deliver pixel-perfect
          designs that not only look great but also provide an exceptional user
          experience.
        </p>

        {/* Stats */}
        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-between text-center text-white font-semibold"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
          viewport={{ once: true }}
        >
          <div>
            <span className="text-2xl text-[var(--color-orange-accent)] font-bold">
              20+
            </span>
            <div className="text-sm mt-1">Projects Completed</div>
          </div>
          <div>
            <span className="text-2xl text-[var(--color-orange-accent)] font-bold">
              3+
            </span>
            <div className="text-sm mt-1">Industry Covered</div>
          </div>
          <div>
            <span className="text-2xl text-[var(--color-orange-accent)] font-bold">
              3+
            </span>
            <div className="text-sm mt-1">Years of Experience</div>
          </div>
        </motion.div>

        {/* Button */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-4 mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
          viewport={{ once: true }}
        >
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-orange-accent)] text-[var(--color-orange-accent)] hover:bg-[var(--color-orange-accent)] hover:text-white transition">
            Download CV{" "}
            <svg
              className="w-8 h-8 bg-white rounded-full p-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M3.99976 12.7465L20.0007 12.7465C20.4149 12.7465 20.7507 12.4107 20.7507 11.9965C20.7507 11.5823 20.4149 11.2465 20.0007 11.2465L3.99976 11.2465C3.58554 11.2465 3.24976 11.5823 3.24976 11.9965C3.24976 12.4107 3.58554 12.7465 3.99976 12.7465Z"
                fill="#343C54"
              />
              <path
                d="M20.5827 12.4726C20.8225 12.1781 20.8052 11.7442 20.5309 11.4697L14.5348 5.46969L14.4782 5.41793C14.1837 5.17774 13.7489 5.19525 13.4743 5.46969C13.1998 5.74426 13.1823 6.17901 13.4225 6.47359L13.4743 6.53023L18.9411 12L13.4743 17.4697C13.1816 17.7626 13.1815 18.2374 13.4743 18.5302C13.7672 18.8229 14.242 18.823 14.5348 18.5302L20.5309 12.5302L20.5827 12.4726Z"
                fill="#343C54"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

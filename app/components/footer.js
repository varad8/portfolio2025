"use client";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, type: "spring" },
  }),
};

export default function Footer() {
  return (
    <footer className="bg-slate-dark overflow-hidden text-light-gray py-10 px-6 md:px-20">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* About */}
        <motion.div variants={fadeUp} custom={0}>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-orange-accent rounded-full animate-pulse"></span>
            About
          </h3>
          <p className="text-mid-gray text-sm leading-relaxed">
            A self-driven developer with experience in frontend, backend, data
            entry and more.
            <br />
            <span className="text-orange-accent font-semibold">
              Passionate
            </span>{" "}
            about clean code and efficient systems.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={fadeUp} custom={1}>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <motion.a
                href="#"
                whileHover={{
                  scale: 1.08,
                  color: "var(--color-orange-accent)",
                }}
                className="hover:text-orange-accent transition"
              >
                Home
              </motion.a>
            </li>
            <li>
              <motion.a
                href="#about"
                whileHover={{
                  scale: 1.08,
                  color: "var(--color-orange-accent)",
                }}
                className="hover:text-orange-accent transition"
              >
                About
              </motion.a>
            </li>
            <li>
              <motion.a
                href="#projects"
                whileHover={{
                  scale: 1.08,
                  color: "var(--color-orange-accent)",
                }}
                className="hover:text-orange-accent transition"
              >
                Projects
              </motion.a>
            </li>
            <li>
              <motion.a
                href="#contact"
                whileHover={{
                  scale: 1.08,
                  color: "var(--color-orange-accent)",
                }}
                className="hover:text-orange-accent transition"
              >
                Contact
              </motion.a>
            </li>
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div variants={fadeUp} custom={2}>
          <h3 className="text-xl font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <motion.span
                whileHover={{
                  color: "var(--color-orange-accent)",
                  scale: 1.05,
                }}
                className="cursor-pointer transition"
              >
                Web Development
              </motion.span>
            </li>
            <li>
              <motion.span
                whileHover={{
                  color: "var(--color-orange-accent)",
                  scale: 1.05,
                }}
                className="cursor-pointer transition"
              >
                App Development
              </motion.span>
            </li>
            <li>
              <motion.span
                whileHover={{
                  color: "var(--color-orange-accent)",
                  scale: 1.05,
                }}
                className="cursor-pointer transition"
              >
                Data Entry
              </motion.span>
            </li>
            <li>
              <motion.span
                whileHover={{
                  color: "var(--color-orange-accent)",
                  scale: 1.05,
                }}
                className="cursor-pointer transition"
              >
                Database Management
              </motion.span>
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={fadeUp} custom={3}>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-mid-gray">
            <li>
              <span className="font-semibold text-orange-accent">Email:</span>{" "}
              official.vrnitsolution@gmail.com
            </li>
            <li>
              <span className="font-semibold text-orange-accent">Phone:</span>{" "}
              +91
            </li>
            <li>
              <span className="font-semibold text-orange-accent">
                Location:
              </span>{" "}
              Ratnagiri, India
            </li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        className="text-center text-sm text-mid-gray mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
        viewport={{ once: true }}
      >
        <span className="inline-block align-middle mr-2 animate-bounce text-orange-accent">
          ♥
        </span>
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-orange-accent">
          Varad Nikharage
        </span>
        . All rights reserved.
      </motion.div>
    </footer>
  );
}

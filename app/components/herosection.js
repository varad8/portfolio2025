"use client";
import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaAngular,
  FaAndroid,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import HireMeBadge from "./HireMeBadge";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

export default function HeroSection() {
  const floatVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  const pulseArrow = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/profile", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] bg-gradient-to-r from-slate-dark via-earthy-brown to-light-gray text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 overflow-hidden">
      {/* Left Content */}
      <div className="relative z-10 w-full md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-4xl font-bold leading-tight">
          {user ? `Hey👋, ${user.fullName.split(" ")[0]}` : "Hi👋,"}
          <br />
          <Typewriter
            options={{
              strings: ["I'm Varad"],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Build Stunning{" "}
          <span className="text-orange-accent">Web Experiences</span>
        </h1>
        <p className="text-lg text-[var(--soft-gray)]">
          Using modern tech like Next.js, Tailwind, React & more to craft
          pixel-perfect UI.
        </p>
        <button className="mt-4 px-6 py-3 bg-orange-accent hover:bg-orange-accent transition rounded text-white font-semibold shadow">
          Get Started
        </button>

        <div className="bg-mid-gray h-[1px]"></div>
        {/* Icons */}
        <div className="flex gap-4 mt-6 justify-center md:justify-start text-3xl">
          <FaHtml5 className="text-orange-600" title="HTML5" />
          <FaCss3Alt className="text-blue-500" title="CSS3" />
          <FaJs className="text-yellow-400" title="JavaScript" />
          <FaReact className="text-cyan-400 animate-spin-slow" title="React" />
          <SiNextdotjs className="text-black " title="Next.js" />
          <FaAngular className="text-red-500" title="Angular.js" />
          <FaAndroid className="text-green-500" title="Android" />
        </div>

        {/* Follow Me */}
        <div className="flex gap-2 items-center">
          <span className="text-md">Check Out My</span>
          <div className="flex gap-2 items-center">
            <Link href="https://www.instagram.com/varadnikharage">
              <FaInstagram size={30} className="text-pink-500" />
            </Link>
            <Link href="https://github.com/varad8">
              <FaGithub size={30} className="text-black" />
            </Link>
            <Link href="https://www.linkedin.com/in/varad-nikharage-59b1561a4/">
              <FaLinkedin size={30} className="text-blue-800" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative z-10 w-full md:w-1/2 mt-12 md:mt-0 flex justify-center items-center">
        <div className="relative">
          <div className="absolute inset-0 z-20">
            {/* Product Designer */}
            <motion.span
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="absolute top-0 left-4 md:top-8 md:left-8 bg-[var(--color-green)] text-white text-sm px-4 py-1 rounded-full shadow flex items-center gap-2"
            >
              Product Designer
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                variants={pulseArrow}
                animate="animate"
              >
                <path
                  d="M21.5127 5.77444C22.1665 3.97839 20.4248 2.23663 18.6287 2.89049L4.63167 7.98618C2.69138 8.69256 2.64771 11.4209 4.56441 12.189L9.72779 14.2582C9.91801 14.3344 10.0687 14.4851 10.145 14.6754L12.2142 19.8387C12.9823 21.7554 15.7106 21.7118 16.417 19.7715L21.5127 5.77444Z"
                  fill="#fff"
                />
              </motion.svg>
            </motion.span>

            {/* Software Engineer */}
            <motion.span
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="absolute top-10 right-0 bg-[var(--color-orange-accent)] text-white text-sm px-4 py-1 rounded-full shadow flex items-center gap-2"
            >
              Software Engineer
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                variants={pulseArrow}
                animate="animate"
              >
                <path
                  d="M21.5127 5.77444C22.1665 3.97839 20.4248 2.23663 18.6287 2.89049L4.63167 7.98618C2.69138 8.69256 2.64771 11.4209 4.56441 12.189L9.72779 14.2582C9.91801 14.3344 10.0687 14.4851 10.145 14.6754L12.2142 19.8387C12.9823 21.7554 15.7106 21.7118 16.417 19.7715L21.5127 5.77444Z"
                  fill="#fff"
                />
              </motion.svg>
            </motion.span>

            {/* App Developer */}
            <motion.span
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="absolute bottom-16 left-4 md:bottom-10 md:left-6 bg-[var(--color-orange-accent)] text-white text-sm px-4 py-1 rounded-full shadow flex items-center gap-2"
            >
              App Developer
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                variants={pulseArrow}
                animate="animate"
              >
                <path
                  d="M21.5127 5.77444C22.1665 3.97839 20.4248 2.23663 18.6287 2.89049L4.63167 7.98618C2.69138 8.69256 2.64771 11.4209 4.56441 12.189L9.72779 14.2582C9.91801 14.3344 10.0687 14.4851 10.145 14.6754L12.2142 19.8387C12.9823 21.7554 15.7106 21.7118 16.417 19.7715L21.5127 5.77444Z"
                  fill="#fff"
                />
              </motion.svg>
            </motion.span>

            {/* Website Designer */}
            <motion.span
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="absolute bottom-6 right-4 md:bottom-16 md:right-6 bg-[var(--color-green)] text-white text-sm px-4 py-1 rounded-full shadow flex items-center gap-2"
            >
              Website Designer
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                variants={pulseArrow}
                animate="animate"
              >
                <path
                  d="M21.5127 5.77444C22.1665 3.97839 20.4248 2.23663 18.6287 2.89049L4.63167 7.98618C2.69138 8.69256 2.64771 11.4209 4.56441 12.189L9.72779 14.2582C9.91801 14.3344 10.0687 14.4851 10.145 14.6754L12.2142 19.8387C12.9823 21.7554 15.7106 21.7118 16.417 19.7715L21.5127 5.77444Z"
                  fill="#fff"
                />
              </motion.svg>
            </motion.span>
          </div>

          {/* Hire Me Badge Positioned Over Image */}
          <div className="absolute z-10 right-0 top-50 w-20 h-20 md:w-36 md:h-36">
            <HireMeBadge />
          </div>

          <div className="absolute inset-0 w-full h-full flex items-center justify-center top-10">
            <svg
              id="sw-js-blob-svg"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <defs>
                {" "}
                <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                  {" "}
                  <stop
                    id="stop1"
                    stopColor="rgba(195, 98, 68, 1)"
                    offset="0%"
                  ></stop>{" "}
                  <stop
                    id="stop2"
                    stopColor="rgba(195, 98, 68, 1)"
                    offset="100%"
                  ></stop>{" "}
                </linearGradient>{" "}
              </defs>{" "}
              <path
                fill="url(#sw-gradient)"
                d="M23,-26.6C30.9,-20.7,39.3,-14.6,42.4,-6.2C45.4,2.3,43.1,12.9,37,19.2C30.8,25.5,20.7,27.4,11.5,29.9C2.4,32.4,-5.9,35.6,-13.8,34.3C-21.7,33,-29.4,27.2,-32.6,19.7C-35.9,12.2,-34.8,3.2,-33.3,-5.9C-31.8,-15.1,-29.8,-24.2,-24.2,-30.5C-18.6,-36.8,-9.3,-40.2,-0.9,-39.2C7.5,-38.1,15,-32.5,23,-26.6Z"
                width="100%"
                height="100%"
                transform="translate(50 50)"
                strokeWidth="0"
                style={{ transition: "0.3s" }}
              ></path>{" "}
            </svg>
          </div>

          {/* Main Image */}
          <Image
            src="/images/heroimgvaradai.png"
            alt="Web Design"
            width={500}
            height={400}
            className="filtershadow rounded-b-sm max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

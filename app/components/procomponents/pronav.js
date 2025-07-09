"use client";

import { FaHome, FaUser, FaShoppingCart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dancing_Script, Oleo_Script } from "next/font/google";

const dancing = Dancing_Script({ weight: "400", subsets: ["latin"] });
const oleo = Oleo_Script({ weight: "400", subsets: ["latin"] });

export default function ProNavbar() {
  const [cartCount, setCartCount] = useState(3); // You can update from global store or props
    const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <header    className={`w-full sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-gradient-to-r from-slate-dark via-earthy-brown to-light-gray"
      }`}>
      <div className="flex justify-between items-center px-6 md:px-12 py-4">
        {/* Logo / Title */}    <div className="text-2xl font-bold">
          <div className="flex gap-2 p-0.5 items-center">
            <h1
              className={`bg-orange-accent text-[18px] text-white rounded-md px-0.5 py-1 ${oleo.className}`}
            >
              Varad
            </h1>
            <span
              className={`text-slate-dark text-[14px] ${dancing.className}`}
            >
              Nikharage
            </span>
          </div>
        </div>

        {/* Nav Icons */}
        <nav className="flex items-center gap-6 text-lg">
          {/* Home */}
          <Link
            href="/"
            className="hover:text-orange-accent transition flex items-center gap-1"
          >
            <FaHome />
            <span className="hidden sm:inline">Home</span>
          </Link>

          {/* Login */}
          <Link
            href="/login"
            className="hover:text-orange-accent transition flex items-center gap-1"
          >
            <FiLogIn />
            <span className="hidden sm:inline">Login</span>
          </Link>

          {/* Profile */}
          <Link
            href="/profile"
            className="hover:text-orange-accent transition flex items-center gap-1"
          >
            <FaUser />
            <span className="hidden sm:inline">Profile</span>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative hover:text-orange-accent transition"
          >
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProfileMenu from "./ProfileMenu";
import { Lobster, Open_Sans } from "next/font/google";
import { FaShoppingCart } from "react-icons/fa";

const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(3);

  // Fetch user profile on mount
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

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "/projects" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-gradient-to-r from-slate-dark via-earthy-brown to-light-gray"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <div className="flex gap-2 p-0.5 items-center">
            <h1
              className={`bg-orange-accent text-[18px] text-white rounded-md px-0.5 py-1 ${lobster.className}`}
            >
              Varad
            </h1>
            <span
              className={`text-slate-dark text-[14px] ${openSans.className}`}
            >
              Nikharage
            </span>
          </div>
        </div>

        {/* Desktop Nav - center */}
        <nav className="hidden md:flex flex-1 justify-center space-x-6 text-slate-dark">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-orange-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side: Cart, Profile/Login, Toggle */}
        <div className="flex items-center space-x-4">
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

          {/* Profile or Login */}
          {user ? (
            <ProfileMenu userProfile={user} />
          ) : (
            <Link
              href="/user/login"
              className="hidden md:block bg-orange-accent text-white px-4 py-2 rounded-full hover:bg-orange-accent/80 transition-all duration-300 text-sm"
            >
              Log In
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-slate-dark text-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                className="w-8 h-8 text-slate-dark"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.999 10.409L16.4524 5.95561C16.8918 5.51627 17.6041 5.51627 18.0434 5.95561C18.4827 6.39495 18.4827 7.10726 18.0434 7.5466L13.59 12L11.999 13.591L7.5455 18.0445C7.10616 18.4839 6.39384 18.4839 5.9545 18.0445C5.51517 17.6052 5.51516 16.8929 5.9545 16.4535L10.408 12L11.999 10.409Z"
                  fill="#343C54"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
                <g opacity="0.4">
                  <path
                    d="M18.0434 16.4534L13.59 12L11.999 13.591L16.4524 18.0444C16.8918 18.4837 17.6041 18.4837 18.0434 18.0444C18.4827 17.605 18.4827 16.8927 18.0434 16.4534Z"
                    fill="#343C54"
                  />
                  <path
                    d="M7.5455 5.95548C7.10616 5.51614 6.39384 5.51614 5.9545 5.95548C5.51517 6.39482 5.51516 7.10713 5.9545 7.54647L10.408 12L11.999 10.409L7.5455 5.95548Z"
                    fill="#343C54"
                  />
                </g>
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-slate-dark"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 7.125L4 7.125C3.37868 7.125 2.875 6.62132 2.875 6C2.875 5.37868 3.37868 4.875 4 4.875L20 4.875C20.6213 4.875 21.125 5.37868 21.125 6C21.125 6.62132 20.6213 7.125 20 7.125ZM20 19.125L4 19.125C3.37868 19.125 2.875 18.6213 2.875 18C2.875 17.3787 3.37868 16.875 4 16.875L20 16.875C20.6213 16.875 21.125 17.3787 21.125 18C21.125 18.6213 20.6213 19.125 20 19.125Z"
                  fill="#343C54"
                />
                <path
                  opacity="0.4"
                  d="M20 10.875C20.6213 10.875 21.125 11.3787 21.125 12C21.125 12.6213 20.6213 13.125 20 13.125H4C3.37868 13.125 2.875 12.6213 2.875 12C2.875 11.3787 3.37868 10.875 4 10.875H20Z"
                  fill="#343C54"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.nav
            key="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden px-6 py-4 space-y-4 shadow-md  ${
              scrolled
                ? "bg-white shadow-md text-slate-dark"
                : "bg-gradient-to-r from-slate-dark via-earthy-brown to-light-gray text-gray-300"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block hover:text-orange-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {!user && (
              <Link
                href="/user/login"
                className="block bg-orange-accent text-white text-center px-4 py-2 rounded-full hover:bg-orange-accent/80 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Log In
              </Link>
            )}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

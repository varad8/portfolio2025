"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

// Simple base64 encode for demonstration (not secure for sensitive data)
function encodeEmail(email) {
  return typeof window !== "undefined" ? btoa(encodeURIComponent(email)) : "";
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        // If email not verified, redirect to verify-otp with email in query
        if (data.error === "Email not verified" && form.email) {
          toast("Please verify your email.", { icon: "✉️" });
          const encryptedEmail = encodeEmail(form.email);
          setTimeout(() => {
            router.push(`/user/verify-otp?e=${encryptedEmail}`);
          }, 1200);
        } else {
          toast.error(data.error || "Login failed");
        }
      } else {
        toast.success(data.message || "Login successful!");
        setTimeout(() => {
          router.replace("/");
        }, 1200);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-green-50 px-4 overflow-hidden">
      <Toaster position="top-center" />
      {/* Abstract Animated Lines */}
      <svg
        className="pointer-events-none absolute left-0 top-0 w-full h-full z-0"
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ minHeight: 600 }}
      >
        <motion.path
          d="M0 200 Q 360 300 720 200 T 1440 200"
          stroke="#F59E42"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0 400 Q 480 500 960 400 T 1440 400"
          stroke="#34D399"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{
            duration: 2.5,
            delay: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0 600 Q 360 700 720 600 T 1440 600"
          stroke="#F59E42"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0.15 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{
            duration: 3,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </svg>

      <motion.div
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md z-10"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <h2 className="text-3xl font-bold text-slate-dark text-center mb-6">
          Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-slate-dark mb-2 font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-soft-gray rounded-md focus:outline-none focus:ring-2 focus:ring-orange-accent"
              disabled={loading}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-slate-dark mb-2 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-soft-gray rounded-md focus:outline-none focus:ring-2 focus:ring-orange-accent"
              disabled={loading}
              required
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="w-full bg-orange-accent text-white font-semibold py-3 rounded-md hover:bg-opacity-90 transition flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block"></span>
            ) : null}
            Sign In
          </motion.button>

          <p className="text-sm text-mid-gray text-center mt-3">
            Didn't have an account?{" "}
            <Link
              href="/user/register"
              className="text-orange-accent hover:underline"
            >
              Sign Up
            </Link>
          </p>

          {/* Optional: Forgot */}
          <p className="text-sm text-mid-gray text-center mt-3">
            Forgot your password?{" "}
          </p>
        </form>
      </motion.div>
    </section>
  );
}

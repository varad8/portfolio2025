"use client";

import Image from "next/image";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl w-full">
          <div className="flex justify-center md:justify-end w-full md:w-1/2">
            <Image
              src="/images/forgotpassword.svg"
              alt="Forgot Password"
              width={350}
              height={350}
              className="object-contain"
              priority
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 bg-white p-8 rounded-xl  space-y-6"
          >
            <h2
              className="text-2xl font-semibold text-center"
              style={{ color: "var(--color-slate-dark)" }}
            >
              Forgot Password
            </h2>
            <p
              className="text-sm text-center"
              style={{ color: "var(--color-mid-gray)" }}
            >
              Enter your email to receive a password reset link
            </p>
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-accent"
              style={{
                borderColor: "var(--color-soft-gray)",
                color: "var(--color-slate-dark)",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-medium text-white transition"
              style={{
                backgroundColor: "var(--color-orange-accent)",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

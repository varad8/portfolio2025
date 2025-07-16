"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email || !token) {
      toast.error("Invalid or expired reset link.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, token, password, confirmPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        router.replace("/user/login");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl w-full">
          <div className="flex justify-center md:justify-end w-full md:w-1/2">
            <Image
              src="/images/newpassword.svg"
              alt="Reset Password"
              width={350}
              height={350}
              className="object-contain"
              priority
            />
          </div>

          <form
            onSubmit={handleReset}
            className="w-full md:w-1/2 bg-white p-8 rounded-xl space-y-6"
          >
            <h2
              className="text-2xl font-semibold text-center"
              style={{ color: "var(--color-slate-dark)" }}
            >
              Reset Password
            </h2>
            <p
              className="text-sm text-center"
              style={{ color: "var(--color-mid-gray)" }}
            >
              Please enter a strong new password
            </p>

            <input
              type="password"
              placeholder="New password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-accent"
              style={{
                borderColor: "var(--color-soft-gray)",
                color: "var(--color-slate-dark)",
              }}
            />

            <input
              type="password"
              placeholder="Confirm password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

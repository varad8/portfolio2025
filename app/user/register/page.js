"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Simple base64 encode for demonstration (not secure for sensitive data)
function encodeEmail(email) {
  return typeof window !== "undefined" ? btoa(encodeURIComponent(email)) : "";
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.includes("@")) newErrors.email = "Invalid email";
    if (!/^[6-9]\d{9}$/.test(form.mobile))
      newErrors.mobile = "Invalid mobile number";
    if (
      form.password.length < 8 ||
      !/\d/.test(form.password) ||
      !/[A-Z]/.test(form.password)
    )
      newErrors.password =
        "Password must be at least 8 characters, include one uppercase and one number";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = "Invalid PIN code";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Registration failed");
      } else {
        toast.success(data.message || "Registration successful!");
        setForm({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          mobile: "",
          address: "",
          address2: "",
          city: "",
          state: "",
          pincode: "",
        });
        // Encode email for query param
        const encryptedEmail = encodeEmail(form.email);
        setTimeout(() => {
          router.push(`/user/verify-otp?e=${encryptedEmail}`);
        }, 1200);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-green-50">
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
        className="w-full max-w-3xl bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl z-10"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <h2 className="text-3xl font-bold text-slate-dark mb-6 text-center">
          Register
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm text-slate-dark mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-soft-gray rounded-md focus:ring-2 focus:ring-orange-accent outline-none bg-gray-50"
              disabled={loading}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-dark mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-soft-gray rounded-md focus:ring-2 focus:ring-orange-accent outline-none bg-gray-50"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-dark mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-soft-gray rounded-md focus:ring-2 focus:ring-orange-accent outline-none bg-gray-50"
              disabled={loading}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-slate-dark mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-soft-gray rounded-md focus:ring-2 focus:ring-orange-accent outline-none bg-gray-50"
              disabled={loading}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm text-slate-dark mb-1">
              Mobile No.
            </label>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-soft-gray rounded-md focus:ring-2 focus:ring-orange-accent outline-none bg-gray-50"
              disabled={loading}
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Address 1 */}
          <div>
            <label className="block text-sm text-slate-dark mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-soft-gray rounded-md focus:ring-2 focus:ring-orange-accent outline-none bg-gray-50"
              disabled={loading}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          {/* Address 2 */}
          <div>
            <label className="block text-sm text-slate-dark mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              name="address2"
              value={form.address2}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-soft-gray rounded-md focus:ring-2 focus:ring-orange-accent outline-none bg-gray-50"
              disabled={loading}
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm text-slate-dark mb-1">City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-soft-gray rounded-md focus:ring-2 focus:ring-orange-accent outline-none bg-gray-50"
              disabled={loading}
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm text-slate-dark mb-1">State</label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-soft-gray rounded-md focus:ring-2 focus:ring-orange-accent outline-none bg-gray-50"
              disabled={loading}
            />
            {errors.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm text-slate-dark mb-1">
              PIN Code
            </label>
            <input
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-soft-gray rounded-md focus:ring-2 focus:ring-orange-accent outline-none bg-gray-50"
              disabled={loading}
            />
            {errors.pincode && (
              <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <motion.button
              type="submit"
              className="w-full bg-orange-accent text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition text-lg shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block"></span>
              ) : null}
              Register
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}

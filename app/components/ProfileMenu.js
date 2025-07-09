"use client";
import { useState, useRef, useEffect } from "react";

export default function ProfileMenu({ userProfile }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef();

  // Fetch user profile on mount
  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    }
    // const fetchUser = async () => {
    //   try {
    //     const res = await fetch("/api/auth/profile", {
    //       credentials: "include",
    //     });
    //     if (res.ok) {
    //       const data = await res.json();
    //       setUser(data.user);
    //     } else {
    //       setUser(null);
    //     }
    //   } catch {
    //     setUser(null);
    //   }
    // };
    // fetchUser();
  }, [userProfile]);

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (!user) return null;

  const initials = user.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Circle */}
      <button
        className="w-10 h-10 rounded-full bg-orange-accent flex items-center justify-center text-white font-bold text-lg shadow hover:opacity-90 transition"
        onClick={() => setOpen((v) => !v)}
        aria-label="Profile"
      >
        {initials}
      </button>
      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg z-50 p-5 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-orange-accent flex items-center justify-center text-white font-bold text-2xl mb-2">
            {initials}
          </div>
          <div className="text-lg font-semibold mb-1">{user.fullName}</div>
          <div className="text-sm text-gray-500 mb-4">{user.email}</div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

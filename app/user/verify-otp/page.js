"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

function decodeEmail(encoded) {
  try {
    return decodeURIComponent(atob(encoded));
  } catch {
    return "";
  }
}

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputsRef = useRef([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const encodedEmail = searchParams.get("e");
  const email = decodeEmail(encodedEmail);

  // 🔁 Initialize OTP timer from server
  useEffect(() => {
    if (!email) return;
    fetchInitialOtp();
  }, [email]);

  const fetchInitialOtp = async () => {
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      const expiry = data.expiresAt ? new Date(data.expiresAt) : null;

      if (expiry) {
        const secondsLeft = Math.ceil((expiry - new Date()) / 1000);
        if (secondsLeft > 0) {
          setTimer(secondsLeft);
        }
      }

      if (!res.ok) {
        toast.error(data.error || "Failed to send OTP");
      } else {
        toast.success(data.message || "OTP sent successfully");
        inputsRef.current[0]?.focus();
      }
    } catch {
      toast.error("Could not connect to server");
    }
  };

  // ⏱ Countdown timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val[0];
    setOtp(newOtp);
    if (idx < 5 && val) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      const newOtp = [...otp];
      newOtp[idx - 1] = "";
      setOtp(newOtp);
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.some((d) => d === "")) {
      toast.error("Please enter all 6 digits");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otp.join(""), email }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Invalid OTP");
      } else {
        toast.success(data.message || "OTP Verified!");
        setTimeout(() => {
          router.replace("/user/login");
        }, 1200);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      const expiry = data.expiresAt ? new Date(data.expiresAt) : null;
      if (expiry) {
        const secondsLeft = Math.ceil((expiry - new Date()) / 1000);
        if (secondsLeft > 0) {
          setTimer(secondsLeft);
        } else {
          setTimer(60);
        }
      }

      if (!res.ok) {
        toast.error(data.error || "Failed to resend OTP");
      } else {
        toast.success(data.message || "OTP resent!");
        setOtp(["", "", "", "", "", ""]);
        inputsRef.current[0]?.focus();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setResending(false);
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
        <h2 className="text-2xl font-bold text-slate-dark text-center mb-4">
          Verify OTP
        </h2>
        <p className="text-center text-mid-gray mb-6">
          Enter the 6-digit code sent to your email
          {email ? ` (${email})` : ""}.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex gap-2 justify-center">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-14 text-2xl text-center border border-soft-gray rounded-md focus:ring-2 focus:ring-orange-accent outline-none bg-gray-50 transition"
                disabled={loading}
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <motion.button
            type="submit"
            className="w-full bg-orange-accent text-white font-semibold py-3 rounded-md hover:bg-opacity-90 transition mt-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block"></span>
            ) : null}
            Verify OTP
          </motion.button>
        </form>
        <div className="flex flex-col items-center mt-6">
          <span className="text-sm text-mid-gray">
            {timer > 0 ? (
              <>
                Resend OTP in{" "}
                <span className="font-semibold text-orange-accent">
                  {timer}s
                </span>
              </>
            ) : (
              <button
                onClick={handleResend}
                className="text-orange-accent font-semibold hover:underline disabled:opacity-60"
                disabled={resending}
              >
                {resending ? "Resending..." : "Resend OTP"}
              </button>
            )}
          </span>
        </div>
      </motion.div>
    </section>
  );
}

// "use client";

// import { useRef, useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { motion } from "framer-motion";
// import { toast, Toaster } from "react-hot-toast";

// // Helper to decode email from query
// function decodeEmail(encoded) {
//   try {
//     return decodeURIComponent(atob(encoded));
//   } catch {
//     return "";
//   }
// }

// export default function VerifyOtpPage() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [timer, setTimer] = useState(60);
//   const [loading, setLoading] = useState(false);
//   const [resending, setResending] = useState(false);
//   const inputsRef = useRef([]);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const encodedEmail = searchParams.get("e");
//   const email = decodeEmail(encodedEmail);

//   // Timer countdown
//   useEffect(() => {
//     if (timer === 0) return;
//     const interval = setInterval(() => setTimer((t) => t - 1), 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   // Focus next input on digit entry
//   const handleChange = (e, idx) => {
//     const val = e.target.value.replace(/[^0-9]/g, "");
//     if (!val) return;
//     const newOtp = [...otp];
//     newOtp[idx] = val[0];
//     setOtp(newOtp);
//     if (idx < 5 && val) {
//       inputsRef.current[idx + 1]?.focus();
//     }
//   };

//   // Handle backspace
//   const handleKeyDown = (e, idx) => {
//     if (e.key === "Backspace" && !otp[idx] && idx > 0) {
//       const newOtp = [...otp];
//       newOtp[idx - 1] = "";
//       setOtp(newOtp);
//       inputsRef.current[idx - 1]?.focus();
//     }
//   };

//   // Submit OTP
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (otp.some((d) => d === "")) {
//       toast.error("Please enter all 6 digits");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ otp: otp.join(""), email }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.error || "Invalid OTP");
//       } else {
//         toast.success(data.message || "OTP Verified!");
//         setTimeout(() => {
//           // Replace history so user can't go back to this page
//           router.replace("/user/login");
//         }, 1200);
//       }
//     } catch {
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Resend OTP
//   const handleResend = async () => {
//     setResending(true);
//     try {
//       const res = await fetch("/api/auth/resend-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.error || "Failed to resend OTP");
//       } else {
//         toast.success(data.message || "OTP resent!");
//         setTimer(60);
//         setOtp(["", "", "", "", "", ""]);
//         inputsRef.current[0]?.focus();
//       }
//     } catch {
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setResending(false);
//     }
//   };

//   return (
//     <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-green-50 px-4 overflow-hidden">
//       <Toaster position="top-center" />
//       {/* Abstract Animated Lines */}
//       <svg
//         className="pointer-events-none absolute left-0 top-0 w-full h-full z-0"
//         width="100%"
//         height="100%"
//         viewBox="0 0 1440 900"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         style={{ minHeight: 600 }}
//       >
//         <motion.path
//           d="M0 200 Q 360 300 720 200 T 1440 200"
//           stroke="#F59E42"
//           strokeWidth="2"
//           fill="none"
//           initial={{ pathLength: 0, opacity: 0.3 }}
//           animate={{ pathLength: 1, opacity: 0.5 }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             repeatType: "reverse",
//             ease: "easeInOut",
//           }}
//         />
//         <motion.path
//           d="M0 400 Q 480 500 960 400 T 1440 400"
//           stroke="#34D399"
//           strokeWidth="2"
//           fill="none"
//           initial={{ pathLength: 0, opacity: 0.2 }}
//           animate={{ pathLength: 1, opacity: 0.4 }}
//           transition={{
//             duration: 2.5,
//             delay: 0.5,
//             repeat: Infinity,
//             repeatType: "reverse",
//             ease: "easeInOut",
//           }}
//         />
//         <motion.path
//           d="M0 600 Q 360 700 720 600 T 1440 600"
//           stroke="#F59E42"
//           strokeWidth="1.5"
//           fill="none"
//           initial={{ pathLength: 0, opacity: 0.15 }}
//           animate={{ pathLength: 1, opacity: 0.3 }}
//           transition={{
//             duration: 3,
//             delay: 1,
//             repeat: Infinity,
//             repeatType: "reverse",
//             ease: "easeInOut",
//           }}
//         />
//       </svg>

//       <motion.div
//         className="w-full max-w-md bg-white p-8 rounded-xl shadow-md z-10"
//         initial={{ opacity: 0, y: 40, scale: 0.97 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.7, type: "spring" }}
//       >
//         <h2 className="text-2xl font-bold text-slate-dark text-center mb-4">
//           Verify OTP
//         </h2>
//         <p className="text-center text-mid-gray mb-6">
//           Enter the 6-digit code sent to your email{email ? ` (${email})` : ""}.
//         </p>
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col items-center gap-6"
//         >
//           <div className="flex gap-2 justify-center">
//             {otp.map((digit, idx) => (
//               <input
//                 key={idx}
//                 ref={(el) => (inputsRef.current[idx] = el)}
//                 type="text"
//                 inputMode="numeric"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleChange(e, idx)}
//                 onKeyDown={(e) => handleKeyDown(e, idx)}
//                 className="w-12 h-14 text-2xl text-center border border-soft-gray rounded-md focus:ring-2 focus:ring-orange-accent outline-none bg-gray-50 transition"
//                 disabled={loading}
//                 autoFocus={idx === 0}
//               />
//             ))}
//           </div>
//           <motion.button
//             type="submit"
//             className="w-full bg-orange-accent text-white font-semibold py-3 rounded-md hover:bg-opacity-90 transition mt-2"
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             disabled={loading}
//           >
//             {loading ? (
//               <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block"></span>
//             ) : null}
//             Verify OTP
//           </motion.button>
//         </form>
//         <div className="flex flex-col items-center mt-6">
//           <span className="text-sm text-mid-gray">
//             {timer > 0 ? (
//               <>
//                 Resend OTP in{" "}
//                 <span className="font-semibold text-orange-accent">
//                   {timer}s
//                 </span>
//               </>
//             ) : (
//               <button
//                 onClick={handleResend}
//                 className="text-orange-accent font-semibold hover:underline disabled:opacity-60"
//                 disabled={resending}
//               >
//                 {resending ? "Resending..." : "Resend OTP"}
//               </button>
//             )}
//           </span>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

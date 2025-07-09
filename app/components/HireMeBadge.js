import { motion } from "framer-motion";

export default function HireMeBadge() {
  return (
    <div className="relative w-full h-full rotate-[-45deg]">
      {/* Outer Circle */}
      <motion.div
        className="absolute inset-0 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: "#2B3A3E" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      >
        {/* Rotating Text */}
        <div className="relative w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="absolute w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                fill="none"
              />
            </defs>
            <text
              fill="#ECECEE"
              fontSize="14"
              fontWeight="bold"
              letterSpacing="2px"
            >
              <textPath href="#circlePath" startOffset="0" textLength="471">
                HIRE ME • HIRE ME • HIRE ME • HIRE ME •
              </textPath>
            </text>
          </svg>

          {/* Inner Circle */}
          <div
            className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center z-10 rotate-[40deg]"
            style={{ backgroundColor: "#C36244" }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0 0 0)"
            >
              <path
                opacity="0.4"
                d="M17.4672 5.47445C17.7601 5.18157 18.2349 5.18157 18.5278 5.47445C18.8207 5.76735 18.8207 6.24211 18.5278 6.535L6.53168 18.5311C6.23878 18.824 5.76402 18.824 5.47113 18.5311C5.17825 18.2382 5.17824 17.7634 5.47113 17.4705L17.4672 5.47445Z"
                fill="#343C54"
              />
              <path
                d="M18.7478 14.9936C18.7479 15.4078 18.412 15.7435 17.9978 15.7436C17.5839 15.7435 17.2482 15.4084 17.2478 14.9946L18.7478 14.9936ZM17.9958 5.25238L18.072 5.25629C18.4501 5.29477 18.7448 5.61422 18.7449 6.00238L18.7478 14.9936H17.9978L17.2478 14.9946L17.2449 6.7514L8.99976 6.74945L8.92261 6.74554C8.54461 6.70692 8.24975 6.38759 8.24976 5.99945C8.2499 5.58532 8.58566 5.24945 8.99976 5.24945L17.9958 5.25238Z"
                fill="#343C54"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

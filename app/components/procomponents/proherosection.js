"use client";

import Typewriter from "typewriter-effect";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaJava,
  FaPhp,
  FaPython,
  FaAndroid
} from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiFirebase, SiSanity } from "react-icons/si";
import Image from "next/image";
import { Poppins, Raleway } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });
const raleway = Raleway({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function ProHeroSection() {
  // Technology clusters arranged around the pointing figure
  const techClusters = [
    // Left cluster (emerging from finger)
    {
      position: "left-0 bottom-[30%] top-[20%]",
      icons: [
        { icon: <FaHtml5 />, color: "#E34F26", name: "HTML5" },
        { icon: <FaCss3Alt />, color: "#214CE5", name: "CSS3" },
        { icon: <FaJs />, color: "#F7DF1E", name: "JavaScript" }
      ]
    },
    // Top-left cluster
    {
      position: "left-[12%] top-[10%]",
      icons: [
        { icon: <FaReact />, color: "#61DAFB", name: "React" },
        { icon: <SiNextdotjs />, color: "#000000", name: "Next.js" }
      ]
    },
    // Top cluster
    {
      position: "left-1/2 top-[-8%] -translate-x-1/2",
      icons: [
        { icon: <FaNodeJs />, color: "#339933", name: "Node.js" },
        { icon: <SiMongodb />, color: "#47A248", name: "MongoDB" }
      ]
    },
    // Top-right clusterg
    {
      position: "right-[10%] top-[10%]",
      icons: [
        { icon: <SiFirebase />, color: "#FFCA28", name: "Firebase" },
        { icon: <SiSanity />, color: "#F03E2F", name: "Sanity" }
      ]
    },
    // Right cluster
    {
      position: "right-0 top-[20%]",
      icons: [
        { icon: <FaPython />, color: "#3776AB", name: "Python" },
        { icon: <FaJava />, color: "#007396", name: "Java" },
        { icon: <FaAndroid />, color: "#3DDC84", name: "Android" },
        { icon: <FaPhp />, color: "#777BB4", name: "PHP" }
      ]
    }
  ];

  return (
    <section className="relative w-full min-h-[90vh] bg-gradient-to-r from-[#2B3A3E] via-[#9E8565] to-[#ECECEE] text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 overflow-hidden">
      
      {/* Left Content */}
      <div className="relative z-10 w-full md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className={`${raleway.className} md:text-4xl text-3xl font-bold leading-tight`}>
          Ready-Made Projects for Students & Developers
        </h1>
        <h3 className={`${raleway.className} text-2xl leading-tight`}>
          Get high-quality projects with source code, built using modern tech like
        </h3>
        <h1 className={`${raleway.className} md:text-4xl text-3xl font-bold leading-tight`}>
          <div className="text-[#C36244]">
            <Typewriter
              options={{
                strings: [
                  'React', 'Next.js', 'JavaScript', 
                  'Node.js', 'MongoDB', 'Firebase',
                  'Python', 'Java', 'Android',
                  'PHP', 'Sanity'
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 30,
              }}
            />
          </div>
        </h1>

        <button className="mt-4 px-6 py-3 bg-[#C36244] hover:bg-[#C36244]/90 transition rounded text-white font-semibold shadow-lg hover:shadow-xl">
          Browse Projects
        </button>
      </div>
<div className="relative z-10 w-full md:w-1/2 mt-12 md:mt-0 flex justify-center items-center min-h-[300px]">
  <div className="relative w-[240px] md:w-[380px] lg:w-[480px] h-[240px] md:h-[380px] lg:h-[480px]">
    
    {/* Developer Image */}
    <Image
      src="/images/man_pointing.png"
      alt="Developer Pointing"
      fill
      className="object-contain z-10 relative"
      priority
    />

    {/* Cloud Overlay at Bottom */}
    <svg 
      className="absolute bottom-[-55px] left-0 w-full h-24 md:h-40 pointer-events-none z-15"
      viewBox="0 0 800 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M100,100
           C80,70 130,40 180,60
           C200,20 270,20 300,50
           C320,20 390,20 420,50
           C450,30 520,30 550,60
           C580,40 640,60 620,90
           C680,100 640,140 580,130
           C550,160 470,160 440,140
           C400,170 320,160 300,130
           C270,160 200,150 180,130
           C130,140 100,120 120,100Z"
        fill="#2B3A3E"
        stroke="#2B3A3E"
        strokeWidth="1"
      />
    </svg>

    {/* Technology Clusters */}
    {techClusters.map((cluster, clusterIndex) => (
      <div 
        key={clusterIndex}
        className={`absolute ${cluster.position} flex flex-col items-center gap-3 z-20`}
      >
        {cluster.icons.map((tech, techIndex) => (
          <div 
            key={techIndex}
            className="group relative flex flex-col items-center"
          >
            <div 
              className="text-2xl md:text-3xl transition-all duration-300 hover:scale-125 hover:z-30"
              style={{
                color: tech.color,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                animation: `float 3s ease-in-out ${techIndex * 0.2}s infinite alternate`
              }}
            >
              {tech.icon}
            </div>
            <span className="absolute top-full mt-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    ))}
  </div>
</div>


      {/* Floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
// src/components/CourseRoadmap.jsx
import React, { useState } from "react";
import {
  CodeBracketIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  ServerIcon,
  CpuChipIcon,
  BoltIcon,
  CloudIcon,
  ServerStackIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";

const roadmapData = {
  "Full Stack": [
    { title: "HTML & CSS", desc: "Basics of web structure & styling", icon: <CodeBracketIcon className="w-5 h-5 text-white" /> },
    { title: "JavaScript", desc: "Interactive front-end logic", icon: <BoltIcon className="w-5 h-5 text-white" /> },
    { title: "React", desc: "Modern front-end library", icon: <DevicePhoneMobileIcon className="w-5 h-5 text-white" /> },
    { title: "Node.js & Express", desc: "Server-side programming", icon: <ServerIcon className="w-5 h-5 text-white" /> },
    { title: "Database", desc: "MongoDB / SQL basics", icon: <CircleStackIcon className="w-5 h-5 text-white" /> },
    { title: "Deployment", desc: "Deploy apps on cloud", icon: <CloudIcon className="w-5 h-5 text-white" /> },
  ],
  "Data Science": [
    { title: "Python", desc: "Programming & data handling", icon: <CodeBracketIcon className="w-5 h-5 text-white" /> },
    { title: "Pandas & NumPy", desc: "Data manipulation", icon: <CpuChipIcon className="w-5 h-5 text-white" /> },
    { title: "Data Visualization", desc: "Charts & plots", icon: <DevicePhoneMobileIcon className="w-5 h-5 text-white" /> },
    { title: "Machine Learning", desc: "Predictive models", icon: <BoltIcon className="w-5 h-5 text-white" /> },
    { title: "Deep Learning", desc: "Neural networks", icon: <ShieldCheckIcon className="w-5 h-5 text-white" /> },
    { title: "Deployment", desc: "ML model on cloud", icon: <CloudIcon className="w-5 h-5 text-white" /> },
  ],
  "Cybersecurity": [
    { title: "Networking Basics", desc: "TCP/IP, HTTP, DNS", icon: <BoltIcon className="w-5 h-5 text-white" /> },
    { title: "Linux & Bash", desc: "Command-line skills", icon: <ServerIcon className="w-5 h-5 text-white" /> },
    { title: "Web Security", desc: "OWASP, XSS, SQLi", icon: <ShieldCheckIcon className="w-5 h-5 text-white" /> },
    { title: "Ethical Hacking", desc: "Penetration testing", icon: <DevicePhoneMobileIcon className="w-5 h-5 text-white" /> },
    { title: "Security Tools", desc: "Wireshark, Metasploit", icon: <CpuChipIcon className="w-5 h-5 text-white" /> },
    { title: "Cloud Security", desc: "AWS/GCP Security basics", icon: <CloudIcon className="w-5 h-5 text-white" /> },
  ],
  "Frontend": [
    { title: "HTML & CSS", desc: "Web structure & styling", icon: <CodeBracketIcon className="w-5 h-5 text-white" /> },
    { title: "JavaScript", desc: "Interactive web", icon: <BoltIcon className="w-5 h-5 text-white" /> },
    { title: "React", desc: "Component-based UI", icon: <DevicePhoneMobileIcon className="w-5 h-5 text-white" /> },
    { title: "State Management", desc: "Redux / Context API", icon: <ServerIcon className="w-5 h-5 text-white" /> },
    { title: "CSS Frameworks", desc: "Tailwind / Bootstrap", icon: <CpuChipIcon className="w-5 h-5 text-white" /> },
    { title: "Deployment", desc: "Netlify / Vercel", icon: <CloudIcon className="w-5 h-5 text-white" /> },
  ],
  "Mobile Development": [
    { title: "Java/Kotlin & Swift", desc: "Native mobile languages", icon: <CodeBracketIcon className="w-5 h-5 text-white" /> },
    { title: "React Native / Flutter", desc: "Cross-platform frameworks", icon: <DevicePhoneMobileIcon className="w-5 h-5 text-white" /> },
    { title: "APIs & Backend", desc: "Connect apps to servers", icon: <ServerIcon className="w-5 h-5 text-white" /> },
    { title: "Database", desc: "Local & cloud storage", icon: <CircleStackIcon className="w-5 h-5 text-white" /> },
    { title: "Testing", desc: "Unit & integration testing", icon: <ShieldCheckIcon className="w-5 h-5 text-white" /> },
    { title: "Deployment", desc: "App Store / Play Store", icon: <RocketLaunchIcon className="w-5 h-5 text-white" /> },
  ],
  "Cloud & DevOps": [
    { title: "Cloud Basics", desc: "AWS, Azure, GCP", icon: <CloudIcon className="w-5 h-5 text-white" /> },
    { title: "CI/CD", desc: "Automated pipelines", icon: <RocketLaunchIcon className="w-5 h-5 text-white" /> },
    { title: "Docker & Containers", desc: "Containerized apps", icon: < CpuChipIcon className="w-5 h-5 text-white" /> },
    { title: "Kubernetes", desc: "Orchestration", icon: <ServerStackIcon className="w-5 h-5 text-white" /> },
    { title: "Monitoring & Logging", desc: "Prometheus, ELK", icon: <ServerIcon className="w-5 h-5 text-white" /> },
    { title: "Deployment", desc: "Cloud deployment", icon: <CloudIcon className="w-5 h-5 text-white" /> },
  ],
};

export function Roadmap() {
  const [activeCourse, setActiveCourse] = useState("Full Stack");

  return (
    <div className="p-6">
      {/* ---- Tabs ---- */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(roadmapData).map((course) => (
          <button
            key={course}
            onClick={() => setActiveCourse(course)}
            className={`px-4 py-2 rounded-md font-semibold ${
              activeCourse === course
                ? "bg-black text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {course}
          </button>
        ))}
      </div>

      {/* ---- Roadmap Scroll ---- */}
      <div className="relative w-full h-[400px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden border border-gray-300 bg-white shadow">
        <div className="absolute top-0 left-10 sm:left-6 w-[2px] h-full bg-gray-300"></div>
        <div className="absolute left-0 right-0 top-0 h-full overflow-hidden">
          <div className="content-scroll relative">
            {roadmapData[activeCourse].map((milestone, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-start pl-20 sm:pl-16 h-[100px] sm:h-[80px]">
                <div className="relative w-12 h-12 rounded-full bg-black flex items-center justify-center mr-0 sm:mr-4 mb-2 sm:mb-0 z-10">
                  {milestone.icon}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">{milestone.title}</div>
                  <div className="text-gray-500 text-xs sm:text-sm">{milestone.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .content-scroll {
            animation: scroll 20s ease-in-out infinite;
          }
          @keyframes scroll {
            0%, 12% { transform: translateY(0); }
            20%, 37% { transform: translateY(-100px); }
            45%, 62% { transform: translateY(-200px); }
            70%, 87% { transform: translateY(-300px); }
            95%, 100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default Roadmap;

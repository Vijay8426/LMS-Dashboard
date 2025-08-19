// src/components/CourseRoadmap.jsx
import React from "react";

export function CourseRoadmap({ title, description, milestones }) {
  return (
    <div className="bg-zinc-950 h-[400px] w-full max-w-[850px] rounded-lg relative flex flex-col p-4 overflow-hidden">
      <div className="flex-grow w-full relative overflow-hidden z-0">
        <div className="absolute z-0 left-0 w-full h-full flex">
          <div className="content-scroll absolute left-0 right-0">
            {/* Timeline line */}
            <div className="fixed left-6 w-[1px] h-[calc(100%-153px)] bg-zinc-600/40"></div>

            {/* Milestone boxes */}
            <div className="pl-16">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="h-[304px] flex items-center justify-center">
                  <div className="w-full mr-6 bg-[#070709] rounded-md border-zinc-600 border-opacity-40 border flex flex-col p-3 relative z-30 isolate">
                    <div className="absolute -left-[44px] top-1/2 -translate-y-1/2 h-[1px] bg-zinc-600 w-[44px] opacity-70"></div>
                    <div
                      className={`absolute -left-[45px] top-1/2 -translate-y-1/2 h-[10px] w-[10px] rounded-full border border-zinc-600`}
                      style={{ backgroundColor: milestone.color }}
                    ></div>

                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="border border-zinc-600 border-opacity-40 w-12 h-12 rounded-md relative overflow-hidden">
                            <div
                              className="absolute top-3/4 right-0 -translate-y-1/2 w-5 h-5 blur-[13px]"
                              style={{ backgroundColor: milestone.color }}
                            ></div>
                            {/* Optional SVG icon */}
                            {milestone.icon && (
                              <div className="p-[7px] isolate">{milestone.icon}</div>
                            )}
                          </div>
                          <div className="flex flex-col justify-start items-start">
                            <div className="text-zinc-100 font-medium">{milestone.title}</div>
                            <div className="text-zinc-400 text-sm">{milestone.time}</div>
                          </div>
                        </div>
                        <div className="text-zinc-400 italic text-sm">{milestone.tags}</div>
                      </div>
                      {milestone.comment && (
                        <div
                          className={`flex items-center space-x-2 border-l-2 pl-3`}
                          style={{ borderColor: milestone.color + "50" }}
                        >
                          <div className={`text-sm italic`} style={{ color: milestone.color }}>
                            "{milestone.comment}"
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-0 h-12 bg-gradient-to-b from-zinc-950 to-transparent z-20"></div>
        <div className="absolute left-0 right-0 bottom-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent z-20"></div>
      </div>

      <div className="flex flex-col transition duration-700 mt-3">
        <p className="text-2xl mb-2 text-white font-semibold">{title}</p>
        <p className="text-zinc-300">{description}</p>
      </div>

      <style>
        {`
          .content-scroll {
            animation: scroll 20s ease-in-out infinite;
          }
          @keyframes scroll {
            0%, 12% { transform: translateY(0); }
            20%, 37% { transform: translateY(-304px); }
            45%, 62% { transform: translateY(-608px); }
            70%, 87% { transform: translateY(-912px); }
            95%, 100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

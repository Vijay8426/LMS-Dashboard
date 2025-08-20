// === FAQChatbot.jsx ===
import React, { useState, useEffect, useRef } from "react";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { IconButton, Typography, Input, Button, Chip } from "@material-tailwind/react";
import studentsData from "@/data/studentsData";
import adminData from "@/data/adminData";
import Chart from "react-apexcharts";

// ------------------- Q&A Mapping with Bar Charts -------------------
const faqQA = {
  student: {
    options: [
      "course progress",
      "assignments",
      "weekly study hours",
      "help",
    ],
    "course progress": {
      text: "Here’s your course progress:",
      chart: (student) => ({
        options: {
          chart: { type: "bar", height: 250 },
          plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
          xaxis: {
            categories: student.coursesData.map((c) => c.title),
            labels: { show: false },
          },
          colors: ["#0288d1"],
        },
        series: [
          {
            name: "Progress",
            data: student.coursesData.map((c) => c.progress),
          },
        ],
        type: "bar",
        height: 250,
      }),
    },
    assignments: {
      text: "Here are your upcoming assignments:",
      table: (student) => student.assignmentsTableData,
    },
    "weekly study hours": {
      text: "Your weekly study hours:",
      chart: (student) => ({
        options: {
          chart: { type: "bar", height: 250 },
          xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          plotOptions: { bar: { horizontal: false, borderRadius: 4 } },
          colors: ["#0288D1"],
        },
        series: [
          {
            name: "Hours",
            data: [student.weeklyStudyHours || 2, 3, 4, 1, 5, 2, 3],
          },
        ],
        type: "bar",
        height: 250,
      }),
    },
    help: { text: "Here are the things you can ask me about:", options: true },
  },

  admin: {
    options: [
      "total students",
      "course completion",
      "daily active users",
      "top courses",
      "new courses",
      "weekly study hours",,
      "help",
    ],
    "total students": {
      text: `Total Students: ${adminData.statsCardsData[0].value}`,
    },
    "course completion": {
      text: "Course Completion Overview Chart:",
      chart: () => adminData.statisticsChartsData[0].chart,
    },
    "daily active users": {
      text: "Daily Active Users Chart:",
      chart: () => adminData.statisticsChartsData[1].chart,
    },
    "top courses": {
      text: "Top Enrolled Courses Chart:",
      chart: () => adminData.statisticsChartsData[2].chart,
    },
    "new courses": {
      text: `Upcoming Courses: ${adminData.newCourses
        .map((c) => c.title)
        .join(", ")}`,
    },
    "weekly study hours": {
      text: "Average Weekly Study Hours (All Students):",
      chart: () => ({
        options: {
          chart: { type: "bar", height: 250 },
          xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          plotOptions: { bar: { horizontal: false, borderRadius: 4 } },
          colors: ["#0288D1"],
        },
        series: [
          {
            name: "Avg Hours",
            data: adminData.studyHoursWeekly || [
              2, 4, 3, 2, 5, 1, 3,
            ],
          },
        ],
        type: "bar",
        height: 250,
      }),
    },
    projects: {
      text: "Projects Table: (static placeholder)",
    },
    help: { text: "Here are the things you can ask me about:", options: true },
  },

  instructor: {
    options: ["class summary", "help"],
    "class summary": {
      text: "This week your class completed 85% of assignments on time 🎉",
    },
    help: { text: "Here are the things you can ask me about:", options: true },
  },
};

// ------------------- Chatbot Component -------------------
export function FAQChatbot({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) {
      const role = user.role;
      const greeting = {
        from: "bot",
        text: "👋 Hi! I’m your assistant. How can I help you today?",
      };
      const optionsBubble = {
        from: "bot",
        text: "You can ask about:",
        options: faqQA[role]?.options || [],
      };
      setMessages([greeting, optionsBubble]);
    }
  }, [user]);

  const handleOptionClick = (option) => {
    const userMessage = { from: "user", text: option };
    setMessages((prev) => [...prev, userMessage]);
    handleBotReply(option.toLowerCase());
  };

  const handleBotReply = (query) => {
    let botReply = {
      from: "bot",
      text: `Sorry, I didn’t understand. Type "help" to see options.`,
    };

    if (user?.role) {
      const qa = faqQA[user.role];
      const key = Object.keys(qa).find((k) => query.includes(k));
      if (key) {
        const answer = qa[key];
        botReply = { from: "bot", text: answer.text };
        if (answer.chart)
          botReply.chart = answer.chart(
            user.role === "student"
              ? studentsData[user.id]
              : null
          );
        if (answer.table)
          botReply.table = answer.table(
            studentsData[user.id]
          );
        if (answer.options) botReply.options = qa.options;
      }
    }

    setMessages((prev) => [...prev, botReply]);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const query = input.toLowerCase();
    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    handleBotReply(query);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
<aside
  className={`fixed top-0 right-0 z-50
    h-[99%] md:h-[90%] xl:h-screen
    w-full sm:w-96 md:w-[28rem]
    bg-white shadow-lg flex flex-col
    transition-transform duration-500 ease-in-out ${
      open ? "translate-x-0" : "translate-x-full"
    }`}
>


      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <Typography variant="h6" color="blue-gray">
          FAQ Assistant
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={onClose}>
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-xl text-sm space-y-2 ${
                msg.from === "user"
                  ? "bg-blue-200 text-blue-900 rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              <div>{msg.text}</div>

              {msg.options && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {msg.options.map((opt, idx) => (
                    <Chip
                      key={idx}
                      value={opt}
                      onClick={() => handleOptionClick(opt)}
                      className="cursor-pointer bg-blue-50 text-blue-700"
                      variant="outlined"
                      size="sm"
                    />
                  ))}
                </div>
              )}

              {msg.chart && <Chart {...msg.chart} />}

              {msg.table && (
                <div className="mt-2 overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-2 py-1 border">Title</th>
                        <th className="px-2 py-1 border">Course</th>
                        <th className="px-2 py-1 border">Deadline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {msg.table.map((a, idx) => (
                        <tr key={idx} className="text-sm even:bg-gray-50">
                          <td className="px-2 py-1 border">{a.title}</td>
                          <td className="px-2 py-1 border">{a.course}</td>
                          <td className="px-2 py-1 border">{a.deadline}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 flex items-center gap-2">
        <Input
          variant="outlined"
          label="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button variant="gradient" color="blue-gray" onClick={sendMessage}>
          <PaperAirplaneIcon className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
}

FAQChatbot.displayName = "/src/widgets/layout/faq-chatbot.jsx";
export default FAQChatbot;

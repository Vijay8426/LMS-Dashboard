import React, { useState, useEffect, useRef } from "react";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { IconButton, Typography, Input, Button } from "@material-tailwind/react";
import studentsData from "@/data/studentsData";
import adminData from "@/data/adminData";
import Chart from "react-apexcharts";

// ------------------- Helper: simple similarity for typo correction -------------------
const similarity = (s1, s2) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  let longer = s1.length > s2.length ? s1 : s2;
  let shorter = s1.length > s2.length ? s2 : s1;
  if (longer.length === 0) return 1.0;

  let matrix = Array(shorter.length + 1)
    .fill(null)
    .map(() => Array(longer.length + 1).fill(0));

  for (let i = 0; i <= shorter.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= longer.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= shorter.length; i++) {
    for (let j = 1; j <= longer.length; j++) {
      const cost = shorter[i - 1] === longer[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  const editDistance = matrix[shorter.length][longer.length];
  return (longer.length - editDistance) / longer.length;
};

const findBestMatch = (query, options) => {
  let best = "";
  let highest = 0;
  for (let opt of options) {
    const score = similarity(query, opt);
    if (score > highest) {
      highest = score;
      best = opt;
    }
  }
  return highest > 0.5 ? best : null;
};

// ------------------- Chatbot Component -------------------
export function FAQChatbot({ open, onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I’m your assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      let botReply = `You asked: "${input}". I’ll get back to you! 😊`;

      // ------------------- Generic Replies -------------------
      const genericReplies = {
        greetings: ["hi", "hello", "hey"],
        thanks: ["thanks", "thank you"],
        howAreYou: ["how are you", "how r u", "how's it going"],
        bye: ["bye", "goodbye", "see you"],
      };

      const query = input.toLowerCase();

      if (genericReplies.greetings.some(g => query.includes(g))) botReply = "Hello! 😊 How can I assist you today?";
      else if (genericReplies.thanks.some(t => query.includes(t))) botReply = "You're welcome! 😄";
      else if (genericReplies.howAreYou.some(h => query.includes(h))) botReply = "I'm just a bot, but I'm doing great! How about you?";
      else if (genericReplies.bye.some(b => query.includes(b))) botReply = "Goodbye! 👋 Have a nice day!";

      // ------------------- Student Logic -------------------
      else if (user?.role === "student") {
        const student = studentsData[user.id];
        if (student) {
          const intents = ["course progress", "assignments", "weekly study hours", "help"];
          const match = findBestMatch(query, intents);

          if (match === "course progress") botReply = "Here’s your course progress:";
          else if (match === "assignments") botReply = "Here are your upcoming assignments:";
          else if (match === "weekly study hours") botReply = "Your weekly study hours:";
          else if (match === "help") botReply = `You can ask about: ${intents.join(", ")}.`;
          else botReply = `I'm not sure I understand. You can ask about: ${intents.join(", ")}.`;
        }
      } 
      
      // ------------------- Admin Logic -------------------
      else if (user?.role === "admin") {
        const intents = [
          "total students",
          "course completion",
          "daily active users",
          "top courses",
          "new courses",
          "projects",
          "help",
        ];
        const match = findBestMatch(query, intents);

        if (match === "total students") botReply = `Total Students: ${adminData.statsCardsData[0].value}`;
        else if (match === "course completion") botReply = "Course Completion Overview Chart:";
        else if (match === "daily active users") botReply = "Daily Active Users Chart:";
        else if (match === "top courses") botReply = "Top Enrolled Courses Chart:";
        else if (match === "new courses") botReply = `Upcoming Courses:\n${adminData.newCourses.map(c => c.title).join(", ")}`;
        else if (match === "projects") botReply = "Projects Table:";
        else if (match === "help") botReply = `You can ask about: ${intents.join(", ")}.`;
        else botReply = `I'm not sure I understand. You can ask about: ${intents.join(", ")}.`;
      }

      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    }, 600);

    setInput("");
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
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white shadow-lg 
      transition-transform duration-500 ease-in-out flex flex-col
      ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <Typography variant="h6" color="blue-gray">FAQ Assistant</Typography>
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
              className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                msg.from === "user"
                  ? "bg-blue-200 text-blue-900 rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}

              {/* --- Admin Charts --- */}
              {user?.role === "admin" && msg.from === "bot" && msg.text.includes("Course Completion Overview") && (
                <Chart {...adminData.statisticsChartsData[0].chart} />
              )}
              {user?.role === "admin" && msg.from === "bot" && msg.text.includes("Daily Active Users Chart") && (
                <Chart {...adminData.statisticsChartsData[1].chart} />
              )}
              {user?.role === "admin" && msg.from === "bot" && msg.text.includes("Top Enrolled Courses Chart") && (
                <Chart {...adminData.statisticsChartsData[2].chart} />
              )}

              {/* --- Student Charts & Tables --- */}
              {user?.role === "student" && msg.from === "bot" && msg.text.toLowerCase().includes("course progress") && (
                <Chart
                  options={{
                    chart: { type: "bar", height: 250 },
                    plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
                    xaxis: { categories: studentsData[user.id].coursesData.map(c => c.title), labels: { show: false } },
                    colors: ["#0288d1"],
                  }}
                  series={[{ name: "Progress", data: studentsData[user.id].coursesData.map(c => c.progress) }]}
                  type="bar"
                  height={250}
                />
              )}
              {user?.role === "student" && msg.from === "bot" && msg.text.toLowerCase().includes("assignments") && (
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
                      {studentsData[user.id].assignmentsTableData.map((a, idx) => (
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
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); sendMessage(); } }}
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

// src/data/studentsData.js
import {
  UserIcon,
  PresentationChartLineIcon,
  BookOpenIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { chartsConfig } from "@/configs";

const coursePool = [
  {
    img: "/img/react.png",
    title: "React JS",
    tag: "Course #1",
    description:
      "Learn to build modern, responsive web applications using React.js, hooks, and reusable components.",
    route: "/dashboard/profile",
  },
  {
    img: "/img/MySQL.png",
    title: "MySQL",
    tag: "Course #2",
    description:
      "Master relational databases with MySQL, including queries, joins, indexes, and optimization.",
    route: "/dashboard/profile",
  },
  {
    img: "/img/python.png",
    title: "Python Programming",
    tag: "Course #3",
    description:
      "Get started with Python basics including loops, functions & OOPS.",
    route: "/dashboard/profile",
  },
  {
    img: "/img/network_security.png",
    title: "Cybersecurity Fundamentals",
    tag: "Course #4",
    description:
      "Understand cybersecurity principles, network vulnerabilities, cryptography, and secure communication practices.",
    route: "/dashboard/profile",
  },
  {
    img: "/img/data-science.jpg",
    title: "Data Science",
    tag: "Course #5",
    description:
      "Analyze and visualize data using Python, statistics, and machine learning techniques.",
    route: "/dashboard/profile",
  },
  {
    img: "/img/machine_learning.png",
    title: "Machine Learning",
    tag: "Course #6",
    description:
      "Build ML models, train datasets, and explore supervised & unsupervised learning methods.",
    route: "/dashboard/profile",
  },
  {
    img: "/img/cloud.webp",
    title: "Cloud Computing",
    tag: "Course #7",
    description:
      "Learn cloud infrastructure, deployment, AWS, Azure, and GCP services.",
    route: "/dashboard/profile",
  },
  {
    img: "/img/figma.jpg",
    title: "UI/UX Design (Figma)",
    tag: "Course #8",
    description:
      "Design intuitive and interactive UI/UX experiences using Figma and prototyping tools.",
    route: "/dashboard/profile",
  },
];

export const studentsData = {
  stud001: {
    id: "stud001",
    role: "student",
    email: "vijay@mail.com",
    password: "123456",
    profile: {
      name: "Vijay M",
      avatar: "/img/profile.webp",
      description:
        "I’m a web developer passionate about frontend development. Skilled in React, JavaScript, CSS, and responsive design. I enjoy learning new technologies and building interactive web apps with real-world projects and challenges.",
      college: "Sri Venkateswara College of Engineering",
    },
    statsCardsData: [
      {
        title: "Courses Enrolled",
        value: "8",
        icon: AcademicCapIcon,
        footer: { value: "+10%", label: "this month", color: "text-green-500" },
      },
      {
        title: "Assignments Done",
        value: "32",
        icon: BookOpenIcon,
        footer: { value: "+12", label: "new", color: "text-green-500" },
      },
      {
        title: "Projects",
        value: "5",
        icon: PresentationChartLineIcon,
        footer: { value: "+2", label: "completed", color: "text-green-500" },
      },
      {
        title: "Overall Rank",
        value: "#8",
        icon: UserIcon,
        footer: { value: "-1", label: "positions", color: "text-red-500" },
      },
    ],
    chartsData: [
      {
        color: "white",
        title: "Enrollments",
        description: "Course completion level",
        footer: "+6% vs last month",
        chart: {
          type: "radialBar",
          height: 250,
          series: [70, 20, 10],
          options: {
            ...chartsConfig,
            labels: ["Completed", "In Progress", "Not Started"],
            colors: ["#22c55e", "#0288d1", "#f59e0b"],
          },
        },
      },
      {
        color: "white",
        title: "Daily Study Hours",
        description: "Hours spent studying",
        footer: "+3% vs last week",
        chart: {
          type: "line",
          height: 220,
          series: [{ name: "Hours", data: [5, 7, 6, 8, 9, 10, 7] }],
          options: {
            ...chartsConfig,
            colors: ["#0288d1"],
            xaxis: { ...chartsConfig.xaxis, categories: ["M", "T", "W", "T", "F", "S", "S"] },
          },
        },
      },
      {
        color: "white",
        title: "Course Progress",
        description: "Completion per course",
        footer: "updated now",
        chart: {
          type: "bar",
          height: 220,
          series: [{ name: "Progress", data: [90, 55, 60, 45, 35, 50, 70, 65] }],
          options: {
            ...chartsConfig,
            plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
            xaxis: { ...chartsConfig.xaxis, categories: ["React", "MySQL", "Python", "Cybersecurity", "Data Science", "Machine Learning", "Cloud", "UI/UX"] },
          },
        },
      },
    ],
    assignmentsTableData: [
      { title: "React Hooks HW", deadline: "Aug 30", course: "React JS" },
      { title: "SQL Queries HW", deadline: "Aug 28", course: "MySQL" },
      { title: "Python Functions HW", deadline: "Aug 29", course: "Python" },
      { title: "Cybersecurity Lab", deadline: "Aug 31", course: "Network Security" },
    ],
    coursesData: coursePool.map((course, i) => ({ ...course, progress: 50 + i * 5 })),
  },

  stud002: {
    id: "stud002",
    role: "student",
    email: "anjali@mail.com",
    password: "123456",
    profile: {
      name: "Anjali R",
      avatar: "/img/profile.webp",
      description:
        "I’m a cybersecurity enthusiast passionate about ethical hacking, malware analysis, and network defense. I explore cryptography, secure protocols, and real-world cybersecurity practices to build a career as a security analyst. I enjoy hands-on labs, CTF challenges, and studying attack-defense strategies.",
      college: "PSG College of Technology",
    },
    statsCardsData: [
      { title: "Courses Enrolled", value: "8", icon: AcademicCapIcon, footer: { value: "+8%", label: "this month", color: "text-green-500" } },
      { title: "Assignments Done", value: "28", icon: BookOpenIcon, footer: { value: "+6", label: "new", color: "text-green-500" } },
      { title: "Projects", value: "4", icon: PresentationChartLineIcon, footer: { value: "+1", label: "completed", color: "text-green-500" } },
      { title: "Overall Rank", value: "#12", icon: UserIcon, footer: { value: "+3", label: "positions", color: "text-green-500" } },
    ],
    chartsData: [
      {
        color: "white",
        title: "Enrollments",
        description: "Course completion level",
        footer: "+4% vs last month",
        chart: {
          type: "radialBar",
          height: 250,
          series: [65, 20, 15],
          options: {
            ...chartsConfig,
            labels: ["Completed", "In Progress", "Not Started"],
            colors: ["#22c55e", "#0288d1", "#f59e0b"],
          },
        },
      },
      {
        color: "white",
        title: "Weekly Study Hours",
        description: "Hours logged",
        footer: "+5% vs last week",
        chart: {
          type: "line",
          height: 220,
          series: [{ name: "Hours", data: [4, 6, 5, 7, 8, 6, 5] }],
          options: {
            ...chartsConfig,
            colors: ["#0288d1"],
            xaxis: { ...chartsConfig.xaxis, categories: ["M", "T", "W", "T", "F", "S", "S"] },
          },
        },
      },
      {
        color: "white",
        title: "Course Progress",
        description: "Progress per course",
        footer: "updated",
        chart: {
          type: "bar",
          height: 220,
          series: [{ name: "Progress", data: [85, 60, 50, 40, 30, 55, 70, 65] }],
          options: {
            ...chartsConfig,
            plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
            xaxis: { ...chartsConfig.xaxis, categories: ["React", "MySQL", "Python", "Cybersecurity", "Data Science", "Machine Learning", "Cloud", "UI/UX"] },
          },
        },
      },
    ],
    assignmentsTableData: [
      { title: "Ethical Hacking Lab", deadline: "Aug 28", course: "Cybersecurity" },
      { title: "SQL Injection Exercise", deadline: "Aug 30", course: "MySQL" },
      { title: "Python Security Script", deadline: "Aug 29", course: "Python" },
      { title: "Network Defense Report", deadline: "Aug 31", course: "Cybersecurity" },
    ],
    coursesData: coursePool.map((course, i) => ({ ...course, progress: 40 + i * 6 })),
  },
};

export default studentsData;

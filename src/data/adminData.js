// src/data/adminData.js

import {
  UsersIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  BookOpenIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  BeakerIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid";

// ----- Statistics Cards (Top Cards) -----
export const statsCardsData = [
  {
    color: "gray",
    icon: UsersIcon,
    title: "Total Students",
    value: "1,250",
    footer: {
      color: "text-green-500",
      value: "+120",
      label: "new this month",
    },
  },
  {
    color: "gray",
    icon: AcademicCapIcon,
    title: "Active Courses",
    value: "48",
    footer: {
      color: "text-green-500",
      value: "+5",
      label: "launched this week",
    },
  },
  {
    color: "gray",
    icon: ClipboardDocumentCheckIcon,
    title: "Avg. Completion Rate",
    value: "76%",
    footer: {
      color: "text-green-500",
      value: "+4%",
      label: "vs last month",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Active Users Today",
    value: "312",
    footer: {
      color: "text-red-500",
      value: "-8%",
      label: "vs yesterday",
    },
  },
];

// ----- Admin Chart Configs -----

import { chartsConfig } from "@/configs";

const courseCompletionChart = {
  type: "donut",
  height: 220,
  series: [65, 25, 10],
  options: {
    ...chartsConfig,
    labels: ["Completed", "In Progress", "Not Started"],
    colors: ["#22c55e", "#facc15", "#f87171"],
    legend: { position: "bottom" },
  },
};

const weeklyStudyHoursChart = {
  type: "area",
  height: 250,
  series: [{ name: "Study Hours", data: [12, 15, 18, 14, 20, 16, 19] }],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: { curve: "smooth", width: 3 },
    markers: { size: 5 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    },
  },
};

const topCoursesChart = {
  type: "bar",
  height: 220,
  series: [{ name: "Enrollments", data: [320, 280, 190, 150, 120] }],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "React Basics",
        "Data Science",
        "UI/UX Design",
        "Python Intro",
        "Cloud Computing",
      ],
    },
  },
};

// Chart card meta
export const statisticsChartsData = [
  {
    color: "white",
    title: "Course Completion Overview",
    description: "Active courses status",
    footer: "+4% vs last month",
    chart: courseCompletionChart,
  },
  {
    color: "white",
    title: "Daily Active Users",
    description: "Student activity this week",
    footer: "+12% vs last week",
    chart: weeklyStudyHoursChart,
  },
  {
    color: "white",
    title: "Top Enrolled Courses",
    description: "Most popular courses",
    footer: "updated just now",
    chart: topCoursesChart,
  },
];

// ---- New Courses Timeline Section ----
export const newCourses = [
  {
    icon: BookOpenIcon,
    color: "text-blue-gray-300",
    title: "React JS Bootcamp",
    description: "01 AUG 10:00 AM",
  },
  {
    icon: GlobeAltIcon,
    color: "text-blue-gray-300",
    title: "Digital Marketing 101",
    description: "30 JUL 05:00 PM",
  },
  {
    icon: CodeBracketIcon,
    color: "text-blue-gray-300",
    title: "Python for Beginners",
    description: "29 JUL 03:45 PM",
  },
  {
    icon: BeakerIcon,
    color: "text-blue-gray-300",
    title: "Data Science Basics",
    description: "27 JUL 01:20 PM",
  },
  {
    icon: PresentationChartBarIcon,
    color: "text-blue-gray-300",
    title: "Finance & Accounting",
    description: "25 JUL 11:00 AM",
  },
  {
    icon: AcademicCapIcon,
    color: "text-blue-gray-300",
    title: "Machine Learning Intro",
    description: "24 JUL 02:00 PM",
  },
];

// ---- Leaderboard Table Data (Sample) ----

// You can replace this with real table data
export const projectsTableData = [
  { name: "React JS", members: "John Doe", enrolled_count: 320 },
  { name: "Data Science", members: "Anjali R", enrolled_count: 280 },
  { name: "UI/UX Design", members: "Rahul K", enrolled_count: 190 },
  { name: "Python Intro", members: "Sneha T", enrolled_count: 150 },
  { name: "Cloud Computing", members: "Harish R", enrolled_count: 120 },
];

// ---- Final Admin Object (for login & dashboard) ----

export const adminData = {
  id: "admin001",
  role: "admin",
  name: "Admin John",
  email: "admin@mail.com",
  password: "123456",
  avatar: "/img/admin.png",

  statsCardsData: statsCardsData,
  statisticsChartsData: statisticsChartsData,
  projectsTableData: projectsTableData,
  newCourses: newCourses,
};

export default adminData;

// src/data/studentCharts.js
import { chartsConfig } from "@/configs";

// 1. Progress in each course (Radial Bar chart)
const myCourseProgressChart = {
  type: "radialBar",
  height: 250,
  series: [80, 60, 40], // Mock completion for 3 courses
  options: {
    ...chartsConfig,
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { show: true, fontSize: "14px" },
          value: { show: true, fontSize: "16px", formatter: (val) => `${val}%` },
        },
      },
    },
    labels: ["Completed", "In Progress", "Not started"],
    colors: ["#22c55e", "#0288d1", "#f59e0b"], // Green, Cyan, Amber
  },
};


// 2. Weekly Study Hours (Line chart)
const dailyActiveUsersChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Active Hours",
      data: [8, 7, 3, 5, 9, 10, 11], // Mock data for Mon-Sun
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"], // Days of week
    },
  },
};

// 3. Assignments Completed per Subject (Horizontal Bar chart)
const assignmentsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "My Course Progress",
      data: [90, 70, 50, 60, 40], // Mock data
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#5bb450"], // orange
    plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["React js", "Express basics", "MySQL", "System Design", "Data Structures"],
    },
  },
};

export const studentChartsData = [
  {
    color: "white",
    title: "My Course Progress",
    description: "Progress in your enrolled courses",
    footer: "+5% vs last month",
    chart: myCourseProgressChart,
  },
  {
    color: "white",
    title: "Daily Study Hours",
    description: "Track your study activity this week",
    footer: "+2 hours vs last week",
    chart: dailyActiveUsersChart,
  },
  {
    color: "white",
    title: "Course Progress",
    description: "Your performance per subject",
    footer: "updated just now",
    chart: assignmentsChart,
  },
];

export default studentChartsData;

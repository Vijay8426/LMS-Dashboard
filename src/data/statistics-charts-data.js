// src/data/adminCharts.js
import { chartsConfig } from "@/configs";

const courseCompletionChart = {
  type: "donut",
  height: 220,
  series: [65, 25, 10], // Completed, In Progress, Not Started
  options: {
    ...chartsConfig,
    labels: ["Completed", "In Progress", "Not Started"],
    colors: ["#22c55e", "#facc15", "#f87171"], // green, yellow, red
    legend: {
      position: "bottom",
    },
  },
};


const weeklyStudyHoursChart = {
  type: "area",
  height: 250,
  series: [
    {
      name: "Study Hours",
      data: [12, 15, 18, 14, 20, 16, 19], // Example weekly hours
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"], // cyan
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
  series: [
    {
      name: "Enrollments",
      data: [320, 280, 190, 150, 120], // Mock enrollments
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
      },
    },
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

export default statisticsChartsData;

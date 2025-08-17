// src/data/adminStats.js
import {
  UsersIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
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

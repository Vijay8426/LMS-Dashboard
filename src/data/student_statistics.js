import {
  BookOpenIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsDataStudent = [
  {
    color: "gray",
    icon: BookOpenIcon,
    title: "Current Courses",
    value: "4",
    footer: {
      color: "text-green-500",
      value: "+1",
      label: "joined this week",
    },
  },
  {
    color: "gray",
    icon: CheckCircleIcon,
    title: "Courses Completed",
    value: "9",
    footer: {
      color: "text-green-500",
      value: "+2",
      label: "this month",
    },
  },
  {
    color: "gray",
    icon: AcademicCapIcon,
    title: "Average Score",
    value: "86%",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "vs last month",
    },
  },
  {
    color: "gray",
    icon: ClockIcon,
    title: "Hours Studied",
    value: "12h",
    footer: {
      color: "text-red-500",
      value: "-1h",
      label: "vs last week",
    },
  },
];

export default statisticsCardsDataStudent;

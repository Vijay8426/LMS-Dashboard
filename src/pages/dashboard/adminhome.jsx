import React from "react";
import {
  Typography,
} from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/solid";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { adminData } from "@/data/adminData";
// import CourseLeaderboard from "@/components/CourseLeaderboard";
// import NewCourses from "@/components/NewCourses";

export function AdminHome() {
  const authUser = JSON.parse(localStorage.getItem("user"));
  if (!authUser || authUser.role !== "admin") {
    return <div className="text-center mt-20 text-red-500">Unauthorized</div>;
  }

  const {
    statsCardsData,
    statisticsChartsData,
    projectsTableData,
    newCourses,
  } = adminData;

  return (
    <div className="mt-12">
      {/* Stats cards */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong> &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>

      {/* Charts */}
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>

      {/* Leaderboard + New Courses
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <CourseLeaderboard projectsTableData={projectsTableData} />
        <NewCourses newCourses={newCourses} />
      </div> */}
    </div>
  );
}

export default AdminHome;

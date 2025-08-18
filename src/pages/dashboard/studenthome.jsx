import React, { useState } from "react";
import { studentsData } from "@/data/studentsData";
import { useNavigate, Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardBody,
  Avatar,
  Tabs,
  TabsHeader,
  Tab,
  Button,
  Progress,
} from "@material-tailwind/react";
import {
  UserIcon,
  PresentationChartLineIcon,
  BookOpenIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

import { StatisticsChart } from "@/widgets/charts"; // ✅ Bring back charts

export function StudentHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // ✅ Get user
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "student") {
    return <div className="text-center mt-20 text-red-500">Unauthorized</div>;
  }

  // ✅ Fetch correct student
  const student = studentsData[user.id];
  if (!student) {
    return <div className="text-center mt-20 text-red-500">Student not found</div>;
  }

  const { profile, chartsData, assignmentsTableData, coursesData } = student;

  return (
    <div className="p-4">
      {/* ---- Welcome Banner ---- */}
      <div className="relative mb-8 h-48 w-full overflow-hidden rounded-xl rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center
 flex items-center px-6">
        <Avatar
          src={profile.avatar}
          alt={profile.name}
          size="lg"
          variant="rounded"
          className="mr-4 border-2 border-white"
        />
        <div>
          <Typography variant="h4" color="white">
            Welcome back, {profile.name} 
          </Typography>
          <Typography variant="small" color="white" className="opacity-80">
            {profile.college}
          </Typography>
        </div>
      </div>

      {/* ---- Tabs ---- */}
      <Tabs value={activeTab} className="mb-6">
        <TabsHeader>
          <Tab value="overview" onClick={() => setActiveTab("overview")}>
            <UserIcon className="mr-2 h-5 w-5" />
            Overview
          </Tab>
          <Tab value="assignments" onClick={() => setActiveTab("assignments")}>
            <ClockIcon className="mr-2 h-5 w-5" />
            Deadlines
          </Tab>
          <Tab value="courses" onClick={() => setActiveTab("courses")}>
            <BookOpenIcon className="mr-2 h-5 w-5" />
            My Learning
          </Tab>
          <Tab value="progress" onClick={() => setActiveTab("progress")}>
            <PresentationChartLineIcon className="mr-2 h-5 w-5" />
            Progress
          </Tab>
        </TabsHeader>
      </Tabs>

      {/* ---- TAB CONTENT ---- */}
      <div>
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card className="p-4 shadow-md border border-blue-gray-200">
              <Typography variant="h6" color="blue-gray">
                Upcoming Assignment
              </Typography>
              {assignmentsTableData.length > 0 ? (
                <div className="mt-2">
                  <Typography variant="small" color="blue-gray">
                    {assignmentsTableData[0].title}
                  </Typography>
                  <Typography variant="small" className="text-blue-gray-600">
                    Due: {assignmentsTableData[0].deadline}
                  </Typography>
                </div>
              ) : (
                <Typography variant="small" className="text-blue-gray-400">
                  No upcoming assignments 🎉
                </Typography>
              )}
            </Card>

            <Card className="p-4 shadow-md border border-blue-gray-200">
              <Typography variant="h6" color="blue-gray">
                Active Courses
              </Typography>
              <Typography variant="h4" className="mt-2 text-blue-gray-800">
                {coursesData.length}
              </Typography>
            </Card>

            <Card className="p-4 shadow-md border border-blue-gray-200">
              <Typography variant="h6" color="blue-gray">
                Learning Hours
              </Typography>
              <Progress
                value={45}
                size="lg"
                className="mt-2 bg-blue-gray-300 [&>div]:bg-blue-gray-900"
              />
              <Typography variant="small" className="mt-1 text-blue-gray-600">
                135 hours this month
              </Typography>
            </Card>
          </div>
        )}

        {/* Assignments */}
        {activeTab === "assignments" && (
          <Card className="p-4 border border-blue-gray-200 shadow-md">
            <Typography variant="h6" color="blue-gray" className="mb-4">
              Assignments & Deadlines
            </Typography>
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Title", "Deadline", "Course"].map((el) => (
                    <th
                      key={el}
                      className="py-2 px-4 text-left text-blue-gray-500 text-xs uppercase"
                    >
                      {el}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assignmentsTableData.map(({ title, deadline, course }, idx) => (
                  <tr key={idx} className="hover:bg-blue-gray-100">
                    <td className="py-2 px-4 font-semibold text-blue-gray-800">
                      {title}
                    </td>
                    <td className="py-2 px-4 text-blue-gray-700">{deadline}</td>
                    <td className="py-2 px-4 text-blue-gray-600">{course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {/* Courses */}
        {activeTab === "courses" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {coursesData.map(({ img, title, description, tag, route, progress }) => (
              <Card
                key={title}
                className="p-4 shadow-md border border-blue-gray-200 hover:bg-blue-gray-50"
              >
                <img src={img} alt={title} className="rounded-lg h-32 w-full object-cover mb-3" />
                <Typography variant="small" className="text-blue-gray-500">
                  {tag}
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mt-1">
                  {title}
                </Typography>
                <Typography variant="small" className="text-blue-gray-600 mb-2">
                  {description}
                </Typography>
                <Progress
                  value={progress}
                  size="sm"
                  className="mb-2 bg-blue-gray-300 [&>div]:bg-blue-gray-900"
                />
              </Card>
            ))}
          </div>
        )}

        {/* Progress (with old charts restored) */}
        {activeTab === "progress" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {chartsData.map((props) => (
              <StatisticsChart
                key={props.title}
                {...props}
                footer={
                  <Typography
                    variant="small"
                    className="flex items-center font-normal text-blue-gray-600"
                  >
                    {props.footer}
                  </Typography>
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentHome;

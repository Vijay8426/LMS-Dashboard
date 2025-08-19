// src/components/StudentHome.jsx
import React, { useState } from "react";
import { studentsData } from "@/data/studentsData";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  Avatar,
  Tabs,
  TabsHeader,
  Tab,
  Progress,
} from "@material-tailwind/react";
import {
  UserIcon,
  PresentationChartLineIcon,
  BookOpenIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

import { StatisticsChart } from "@/widgets/charts"; 
import { StatisticsCard } from "@/widgets/cards/statistics-card"; // ✅ import reusable StatisticsCard
import DataTable from "@/widgets/table/datatable";
import {CourseCard} from "@/widgets/cards"; // ✅ import reusable CourseCard

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
      <div className="relative mb-8 h-48 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center flex items-center px-6">
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
<Tabs value={activeTab}>
  <TabsHeader
    className="overflow-x-auto whitespace-nowrap rounded-none border-b border-gray-200 bg-transparent p-0"
    indicatorProps={{
      className: "bg-transparent border-b-2 border-black shadow-none rounded-none",
    }}
  >
    {[
      { label: "Overview", value: "overview", icon: <UserIcon className="h-5 w-5" /> },
      { label: "Deadlines", value: "assignments", icon: <ClockIcon className="h-5 w-5" /> },
      { label: "My Learning", value: "courses", icon: <BookOpenIcon className="h-5 w-5" /> },
      { label: "Progress", value: "progress", icon: <PresentationChartLineIcon className="h-5 w-5" /> },
    ].map(({ label, value, icon }) => (
      <Tab
        key={value}
        value={value}
        onClick={() => setActiveTab(value)}
        className={`flex items-center gap-2 px-4 py-2 font-semibold min-w-[120px] ${
          activeTab === value ? "text-black" : "text-gray-600 hover:text-gray-800"
        }`}
      >
        {icon} {label}
      </Tab>
    ))}
  </TabsHeader>
</Tabs>


      {/* ---- TAB CONTENT ---- */}
      <div>
{/* Overview */}
{activeTab === "overview" && (
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {/* --- First Card --- */}
  <StatisticsCard
    color="blue"
    value="12"
    title="Active Courses"
    icon={<UserIcon className="w-6 h-6 text-white" />}
    footer={
      <Typography className="font-normal text-blue-gray-600">
        <strong className="text-green-500">+5%</strong> &nbsp; since last month
      </Typography>
    }
  />

  {/* --- Second Card --- */}
  <StatisticsCard
    color="green"
    value="8"
    title="Assignments Completed"
    icon={<BookOpenIcon className="w-6 h-6 text-white" />}
    footer={
      <Typography className="font-normal text-blue-gray-600">
        <strong className="text-green-500">+3</strong> &nbsp; new submissions
      </Typography>
    }
  />

  {/* --- Third Card --- */}
  <StatisticsCard
    color="purple"
    value="45h"
    title="Learning Hours"
    icon={<ClockIcon className="w-6 h-6 text-white" />}
    footer={
      <Typography className="font-normal text-blue-gray-600">
        <strong className="text-red-500">-2h</strong> &nbsp; compared to last week
      </Typography>
    }
  />
</div>

)}



{activeTab === "assignments" && (
  <Card className="p-4 border border-blue-gray-200 shadow-md">
    <Typography variant="h6" color="blue-gray" className="mb-4">
      Assignments & Deadlines
    </Typography>

    {/* ✅ Use reusable DataTable */}
    <DataTable
      columns={[
        { label: "Title", accessor: "title", bold: true },
        { label: "Deadline", accessor: "deadline" },
        { label: "Course", accessor: "course" },
      ]}
      rows={assignmentsTableData}
      pageSize={5}
      searchable={true}
    />
  </Card>
)}

        {/* Courses - ✅ Use CourseCard */}
        {activeTab === "courses" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {coursesData.map(({ img, title, description, route, progress }) => (
              <CourseCard
                key={title}
                img={img}
                title={title}
                description={description}
                route={route}
                buttonText={progress === 100 ? "Completed" : "Continue"}
                progress={progress} // ✅ shows progress bar inside CourseCard
              />
            ))}
          </div>
        )}

        {/* Progress (charts) */}
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

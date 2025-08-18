import React, { useState } from "react";
import { studentsData } from "@/data/studentsData";
import { useNavigate,Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Tooltip,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Progress,
} from "@material-tailwind/react";
import {
  UserIcon,
  PencilIcon,
  PresentationChartLineIcon,
  BookOpenIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/solid";

import { ProfileInfoCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";

export function StudentHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // ✅ Get the user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "student") {
    return <div className="text-center mt-20 text-red-500">Unauthorized</div>;
  }

  // ✅ Fetch correct student object
  const student = studentsData[user.id];
  if (!student) {
    return <div className="text-center mt-20 text-red-500">Student not found</div>;
  }

  const { profile, chartsData, assignmentsTableData, coursesData } = student;

  return (
    <>
      {/* Background image */}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>

      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          {/* Profile + Tabs */}
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={profile.avatar}
                alt={profile.name}
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {profile.name}
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-600">
                  {profile.college}
                </Typography>
              </div>
            </div>

            {/* Tabs */}
            <div className="w-96">
              <Tabs value={activeTab}>
                <TabsHeader>
                  <Tab value="profile" onClick={() => setActiveTab("profile")}>
                    <UserIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Profile
                  </Tab>
                  <Tab value="course-stats" onClick={() => setActiveTab("course-stats")}>
                    <PresentationChartLineIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Progress
                  </Tab>
                  <Tab value="courses" onClick={() => setActiveTab("courses")}>
                    <BookOpenIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Projects
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>

          {/* ------- TAB CONTENT ------- */}
          <div className="w-full mb-12">
            {activeTab === "profile" && (
              <ProfileInfoCard
                title="Profile Information"
                description={profile.description || "No description provided."}
                details={{
                  "first name": profile.name.split(" ")[0],
                  email: student.email,
                  location: "India",
                }}
                action={
                  <Tooltip content="Edit Profile">
                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                  </Tooltip>
                }
              />
            )}

            {/*  Progress tab */}
            {activeTab === "course-stats" && (
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Progress
                </Typography>
                <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                  {chartsData.map((props) => (
                    <StatisticsChart
                      key={props.title}
                      {...props}
                      footer={
                        <Typography variant="small" className="flex items-center font-normal text-blue-gray-600">
                          <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                          &nbsp;{props.footer}
                        </Typography>
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Assignments
                </Typography>

                <Card className="w-full">
                  <CardBody>
                    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                      {/* Assignments / Deadlines table */}
                      <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
                        <CardHeader
                          floated={false}
                          shadow={false}
                          color="transparent"
                          className="m-0 flex items-center justify-between p-6"
                        >
                          <Typography variant="h6" color="blue-gray" className="mb-1">
                            Assignments and Deadlines
                          </Typography>
                        </CardHeader>

                        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                          <table className="w-full min-w-[640px] table-auto">
                            <thead>
                              <tr>
                                {["Title", "Deadline", "Course"].map((el) => (
                                  <th
                                    key={el}
                                    className="border-b border-blue-gray-50 py-3 px-6 text-left"
                                  >
                                    <Typography
                                      variant="small"
                                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                                    >
                                      {el}
                                    </Typography>
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {assignmentsTableData.map(({ title, deadline, course }, idx) => {
                                const className = `py-3 px-5 ${
                                  idx === assignmentsTableData.length - 1
                                    ? ""
                                    : "border-b border-blue-gray-50"
                                }`;
                                return (
                                  <tr key={idx} className="hover:bg-gray-50">
                                    <td className={className}>
                                      <Typography variant="small" className="font-bold" color="blue-gray">
                                        {title}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <Typography variant="small">{deadline}</Typography>
                                    </td>
                                    <td className={className}>
                                      <Typography variant="small" color="blue-gray">
                                        {course}
                                      </Typography>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </CardBody>
                      </Card>

                      {/* Recent New Courses (static or optional) */}
                      {/* You can include newCourses block if needed */}
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </div>

          {/* ---- COURSES GRID ---- */}
          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Courses
            </Typography>

            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {coursesData.map(({ img, title, description, tag, route, progress }) => (
                <Card key={title} color="transparent" shadow={false}>
                  <CardHeader floated={false} color="gray" className="mx-0 mt-0 mb-4 h-64 xl:h-40">
                    <img src={img} alt={title} className="h-full w-full object-cover" />
                  </CardHeader>

                  {/* Progress Bar */}
                  <div className="px-2 mb-4">
                    <Tooltip content={`${progress}% completed`} placement="top">
                      <div>
                        <Progress
                          value={progress}
                          size="sm"
                          className={
                            progress >= 75
                              ? "bg-blue-100 [&>div]:bg-blue-700"
                              : progress >= 40
                              ? "bg-blue-100 [&>div]:bg-blue-500"
                              : "bg-blue-100 [&>div]:bg-blue-300"
                          }
                        />
                      </div>
                    </Tooltip>
                  </div>

                  <CardBody className="py-0 px-1">
                    <Typography variant="small" className="font-normal text-blue-gray-500">
                      {tag}
                    </Typography>
                    <Typography variant="h5" color="blue-gray" className="mt-1 mb-2">
                      {title}
                    </Typography>
                    <Typography variant="small" className="font-normal text-blue-gray-500">
                      {description}
                    </Typography>
                  </CardBody>

                  <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                    <Link to={route}>
                      <Button variant="outlined" size="sm">
                        View Course
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default StudentHome;

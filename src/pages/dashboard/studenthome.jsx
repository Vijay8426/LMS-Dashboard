import React, { useState } from "react";
import { StatisticsChart } from "@/widgets/charts";
import {
  studentChartsData,
   assignmentsTableData,
  projectsData,
  newCourses
} from "@/data";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Tabs,
  TabsHeader,
  Button,
  Tab, // ✅ Added
} from "@material-tailwind/react";

import {
  UserIcon,
  PencilIcon,
  PresentationChartLineIcon,
  BookOpenIcon,
  ClockIcon,
  ArrowUpIcon, // ✅ Added
  CheckCircleIcon, // ✅ Added
  EllipsisVerticalIcon, // ✅ Added
} from "@heroicons/react/24/solid";

import { ProfileInfoCard } from "@/widgets/cards";


export function StudentHome() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>

      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          {/* Profile header + Tabs */}
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/profile.webp"
                alt="vijay"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Vijay M
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  Sri Venkateswara College of Engineering
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value={activeTab}>
                <TabsHeader>
                  <Tab value="profile" onClick={() => setActiveTab("profile")}>
                    <UserIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Profile
                  </Tab>
                  <Tab
                    value="course-stats"
                    onClick={() => setActiveTab("course-stats")}
                  >
                    <PresentationChartLineIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Progress
                  </Tab>
                  <Tab
                    value="courses"
                    onClick={() => setActiveTab("courses")}
                  >
                    <BookOpenIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Courses
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>

          {/* Full-width Sections */}
          <div className="w-full mb-12">
            {activeTab === "profile" && (
              <ProfileInfoCard
                title="Profile Information"
                description="I’m a passionate Frontend Developer with a strong eye for design and detail. I specialize in building responsive, user-friendly, and performant web applications using React.js, JavaScript (ES6+), HTML, CSS, and modern frameworks."
                details={{
                  "first name": "Vijay",
                  mobile: "(44) 123 1234 123",
                  email: "vijay@mail.com",
                  location: "India",
                  social: (
                    <div className="flex items-center gap-4">
                      <i className="fa-brands fa-facebook text-blue-700" />
                      <i className="fa-brands fa-twitter text-blue-400" />
                      <i className="fa-brands fa-instagram text-purple-500" />
                    </div>
                  ),
                }}
                action={
                  <Tooltip content="Edit Profile">
                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                  </Tooltip>
                }
              />
            )}

            {activeTab === "course-stats" && (
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Progress
                </Typography>
                <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                  {studentChartsData.map((props) => (
                    <StatisticsChart
                      key={props.title}
                      {...props}
                      footer={
                        <Typography
                          variant="small"
                          className="flex items-center font-normal text-blue-gray-600"
                        >
                          <ClockIcon
                            strokeWidth={2}
                            className="h-4 w-4 text-blue-gray-400"
                          />
                          &nbsp;{props.footer}
                        </Typography>
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Assignments
                </Typography>
<Card className="w-full">
      <CardBody>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
              Assignments and Deadlines
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["course", "top scorrer", "enrollments"].map(
                    (el) => (
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
                    )
                  )}
                </tr>
              </thead>
<tbody>
  { assignmentsTableData.map(({ title, deadline, course}, key) => {
    const className = `py-3 px-5 ${
      key ===  assignmentsTableData.length - 1
        ? ""
        : "border-b border-blue-gray-50"
    }`;

    return (
      <tr key={title} className="hover:bg-gray-50">
        {/* Course Name */}
        <td className={className}>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-bold"
          >
            {title}
          </Typography>
        </td>

        {/* Top Scorer */}
        <td className={className}>
          <Typography
            variant="small"
            className="text-sm font-medium text-blue-gray-700"
          >
            {deadline}
          </Typography>
        </td>

        {/* Enrolled Count */}
        <td className={className}>
          <Typography
            variant="small"
            className="text-sm font-medium text-blue-gray-900"
          >
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
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              New Courses
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>{newCourses.length} new courses</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {newCourses.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === newCourses.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div>
      </CardBody>
    </Card> 
              </div>
            )}
          </div>

          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Courses
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {projectsData.map(
                ({ img, title, description, tag, route, members }) => (
                  <Card key={title} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {tag}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </CardBody>
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <Link to={route}>
                        <Button variant="outlined" size="sm">
                          view project
                        </Button>
                      </Link>

                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default StudentHome;

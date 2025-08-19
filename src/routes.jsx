import {
  HomeIcon,
  ChartBarIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  BookOpenIcon
} from "@heroicons/react/24/solid";
import { AdminHome, StudentHome, Profile, Tables, Notifications, CoursesGrid, Roadmap } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = { className: "w-5 h-5 text-inherit" };

export function getRoutes() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  return [
    {
      layout: "dashboard",
      pages: [
        userRole === "admin"
          ? {
              icon: <ChartBarIcon {...icon} />,
              name: "Dashboard",
              path: "/adminHome",
              element: <AdminHome />,
            }
          : {
              icon: <HomeIcon {...icon} />,
              name: "Dashboard",
              path: "/studentHome",
              element: <StudentHome />,
            },
      ],
    },

    // ✅ Only show this block for students
    ...(userRole === "student"
      ? [
          {
            title: "Courses",
            layout: "dashboard",
            pages: [
              {
                icon: <BookOpenIcon {...icon} />,
                name: "Courses",
                path: "/courses",
                element: <CoursesGrid />,
              },
              {
                icon: <RectangleStackIcon {...icon} />,
                name: "Navigator",
                path: "/domains",
                element: <Roadmap />,
              },
            ],
          },
        ]
      : []),

    {
      title: "auth pages",
      layout: "auth",
      pages: !user
        ? [
            {
              icon: <ServerStackIcon {...icon} />,
              name: "Sign In",
              path: "/sign-in",
              element: <SignIn />,
            },
          ]
        : [
            {
              icon: <ServerStackIcon {...icon} />,
              name: "Log Out",
              path: "/sign-in",
              element: <SignIn />,
              action: () => {
                localStorage.clear();
              },
            },
          ],
    },
  ];
}

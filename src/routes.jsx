import {
  HomeIcon,
  ChartBarIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { AdminHome, StudentHome, Profile, Tables, Notifications } from "@/pages/dashboard";
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

import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { AdminHome, Profile, Tables, Notifications,StudentHome } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = { className: "w-5 h-5 text-inherit" };
const user = JSON.parse(localStorage.getItem("user"));
const userRole = user?.role;

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon className="w-5 h-5" />,
        name: "dashboard",
        path: userRole === "admin" ? "/adminHome" : "/studentHome",
        element: userRole === "admin" ? <AdminHome /> : <StudentHome />,
      }
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;

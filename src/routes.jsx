/**
 * Route Configuration
 * -------------------
 * Dynamically generates navigation and route definitions
 * based on the logged-in user's role (admin / student).
 *
 * Roles:
 *  - Admin → Gets access to Admin Dashboard + Student Management
 *  - Student → Gets access to Student Dashboard + Navigator
 *
 * Auth:
 *  - If user not logged in → Only "Sign In" route is shown
 *  - If logged in → "Log Out" replaces "Sign In"
 */

import {
  HomeIcon,
  ChartBarIcon,
  TableCellsIcon,
  ServerStackIcon,
  RectangleStackIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

import {
  AdminHome,
  StudentHome,
  CoursesGrid,
  Roadmap,
  StudentDetails, // ✅ Admin-only
} from "@/pages/dashboard";

import { SignIn } from "@/pages/auth";

// ✅ Standardized icon props
const icon = { className: "w-5 h-5 text-inherit" };

export function getRoutes() {
  // ✅ Retrieve user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  return [
    /**
     * DASHBOARD (Role-based entry point)
     * - Admin → Admin Dashboard
     * - Student → Student Dashboard
     */
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

    /**
     * COURSES SECTION (always visible)
     * - Courses → Available to both roles
     * - Navigator → Student-only (domain roadmap)
     */
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
        ...(userRole === "student"
          ? [
              {
                icon: <RectangleStackIcon {...icon} />,
                name: "Navigator",
                path: "/domains",
                element: <Roadmap />,
              },
            ]
          : []),
      ],
    },

    /**
     * ADMIN SECTION (admin-only)
     * - Student Details → View/manage student information
     */
    ...(userRole === "admin"
      ? [
          {
            title: "Admin",
            layout: "dashboard",
            pages: [
              {
                icon: <TableCellsIcon {...icon} />,
                name: "Student Details",
                path: "/students",
                element: <StudentDetails />,
              },
            ],
          },
        ]
      : []),

    /**
     * AUTHENTICATION
     * - If no user → Show "Sign In"
     * - If user logged in → Replace with "Log Out" (clears storage)
     */
    {
      title: "Auth Pages",
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
              path: "/sign-in", // ✅ re-use sign-in route for logout redirect
              element: <SignIn />,
              action: () => {
                localStorage.clear();
                window.location.reload(); // ✅ force refresh for immediate effect
              },
            },
          ],
    },
  ];
}

import { Routes, Route } from "react-router-dom";
import { ChartPieIcon, UserIcon, UserPlusIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { getRoutes } from "@/routes"; // Named import

export function Auth() {
  const routes = getRoutes(); // call function to get current routes

  const navbarRoutes = [
    {
      name: "dashboard",
      path: "/dashboard/sign-in",
      icon: ChartPieIcon,
    },
    {
      name: "profile",
      path: "/dashboard/sign-in",
      icon: UserIcon,
    },
    {
      name: "sign up",
      path: "/auth/sign-up",
      icon: UserPlusIcon,
    },
    {
      name: "sign in",
      path: "/auth/sign-in",
      icon: ArrowRightOnRectangleIcon,
    },
  ];

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }, idx) => (
              <Route key={idx} path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;

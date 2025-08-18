import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { Sidenav, DashboardNavbar, FAQChatbot, Footer } from "@/widgets/layout";
import { getRoutes } from "@/routes"; // dynamic routes function
import { useMaterialTailwindController } from "@/context";

export function AdminDashboard() {
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const [openChat, setOpenChat] = useState(false);

  // Memoize routes so they re-evaluate on every render (after login/logout)
  const routes = useMemo(() => getRoutes(), []);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />

        {/* FAQ Sidebar */}
        <FAQChatbot open={openChat} onClose={() => setOpenChat(false)} />

        {/* Floating Button */}
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenChat((prev) => !prev)}
        >
          {openChat ? (
            <XMarkIcon className="h-6 w-6 text-red-600" />
          ) : (
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-blue-gray" />
          )}
        </IconButton>

        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }, index) => (
                <Route key={index} path={path} element={element} />
              ))
          )}
        </Routes>

        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

AdminDashboard.displayName = "/src/layout/dashboard.jsx";
export default AdminDashboard;

import { lazy } from "react";
import { Outlet } from "react-router-dom";

// project import
import Loadable from "components/Loadable";
import Dashboard from "layout/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import SamplePage from "pages/extra-pages/sample-page";
import { element } from "prop-types";

// Lazy loading of the components
const Color = Loadable(lazy(() => import("pages/component-overview/color")));
const Typography = Loadable(
  lazy(() => import("pages/component-overview/typography"))
);
const Shadow = Loadable(lazy(() => import("pages/component-overview/shadows")));
const DashboardDefault = Loadable(lazy(() => import("pages/dashboard/index")));
const EmployeeManagement = Loadable(lazy(() => import("pages/EmployeeManagement")));

// Main routes configuration

const MainRoutes = {
  element: <ProtectedRoute />, // Wrapping all routes with ProtectedRoute
  children: [
    {
      path: "/", // Dashboard layout
      element: <Dashboard />,
      children: [
        {
          path: "/",
          element: <DashboardDefault />, // Default dashboard route
        },
        {
          path: "dashboard",
          element: <DashboardDefault />, // Dashboard page
        },
        {
          path: "employee-management",
          element: <EmployeeManagement />,
        },
        {
          path: "sample-page",
          element: <SamplePage />,
        },




        // Admin management section wrapped by MasterProtecterRoute
        // {
        //   element: <MasterProtecterRoute />, // Wrapping this section with MasterProtecterRoute
        //   children: [
        //     {
        //       path: "admin-management",
        //       element: <AdminManage />, // Admin management page
        //     },
        //   ],
        // },
      ],
    },
  ],
};

export default MainRoutes;

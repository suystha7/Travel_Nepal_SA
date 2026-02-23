import { PATH } from "@/constants/paths";
import Login from "@/pages/auth/Login";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "./AdminLayout";
import { packageRoutes } from './private-routes/package-routes';
import { dashboardRoutes } from './private-routes/dashboard-routes';
import { aboutRoutes } from './private-routes/about-routes';
import { locationRoutes } from './private-routes/location-routes';
import { settingsRoutes } from './private-routes/settings-routes';
import { blogRoutes } from './private-routes/blog-routes';
import { accountSettingsRoutes } from './private-routes/accountSettings-route';

export const appRouter = createBrowserRouter([
  {
    path: PATH.login,
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={PATH.dashboard} replace />,
      },
      ...dashboardRoutes,
      ...locationRoutes,
      ...aboutRoutes,
      ...packageRoutes,
      ...settingsRoutes,
      ...blogRoutes,
      ...accountSettingsRoutes,
    ],
  },
]);

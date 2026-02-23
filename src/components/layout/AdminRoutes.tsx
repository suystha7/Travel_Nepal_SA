import { RouterProvider } from 'react-router-dom';
import { appRouter } from './AppRouter';

const AdminRoutes = () => {
  return <RouterProvider router={appRouter} />;
};
export default AdminRoutes;

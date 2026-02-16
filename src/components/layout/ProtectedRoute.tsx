// import { PATH } from '@/constants/paths';
import { useAuth } from '@/context/AuthContext';
import { Loader } from 'lucide-react';
// import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isInitializing } = useAuth();

  if (isInitializing)
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-slate-50 dark:from-slate-900 to-slate-100 dark:to-slate-800 min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary-400/20 blur-xl rounded-full animate-pulse"></div>
            <div className="relative dark:bg-slate-800 shadow-lg p-6 border border-slate-200 dark:border-slate-700 rounded-full">
              <Loader className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
          </div>

          <div className="text-center">
            <p className="font-medium text-slate-600 dark:text-slate-300 text-sm">
              Checking permissions
            </p>
            <div className="flex justify-center space-x-1 mt-4">
              <div className="bg-primary-500 rounded-full w-2 h-2 animate-bounce [animation-delay:-0.3s]"></div>
              <div className="bg-primary-500 rounded-full w-2 h-2 animate-bounce [animation-delay:-0.15s]"></div>
              <div className="bg-primary-500 rounded-full w-2 h-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    );

  // if (!role) {
  //   return <Navigate to={PATH.auth} replace />;
  // }

  // if (!allowedRoles.includes(role)) {
  //   if (role === 'admin') {
  //     // return <Navigate to={PATH.productManager.product.list} replace />;
  //   }
  //   if (role === 'delivery_agent') {
  //     // return <Navigate to={PATH.orderManagement.order.list} replace />;
  //   }
  // }

  return <>{children}</>;
};

export default ProtectedRoute;

import React from 'react';
import AdminRoutes from './components/layout/AdminRoutes';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <AdminRoutes />
      </AuthProvider>
    </>
  );
};

export default App;

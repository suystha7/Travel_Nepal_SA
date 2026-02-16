import { Outlet, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Sidebar from '@/common/SideBar';
import Header from '@/common/Header/Header';
import { clearAllCookies, getCookie } from '@/utils/cookie';
import { COOKIE_CONFIG, PATH } from '@/constants/paths';
import { showErrorMessage } from '@/utils/toast';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const access = getCookie(COOKIE_CONFIG.accessToken);
  const refresh = getCookie(COOKIE_CONFIG.refreshToken);
  // const access = true;
  // const refresh = true;
  useEffect(() => {
    if (!access || !refresh) {
      clearAllCookies();
      showErrorMessage('You are not logged in!');
      navigate(PATH.login);
    }
  }, [navigate, access, refresh]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="flex flex-col flex-1 bg-[#ecf3f0] mt-1 px-4 py-5 rounded-md overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;

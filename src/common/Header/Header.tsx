'use client';

import { useGetProfile } from '@/pages/accountSettings/profile/hooks/useGetProfile';
import LogoSection from './partials/LogoSection';
import ProfileSection from './partials/ProfileSection';
import { Menu } from 'lucide-react';

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { profileData } = useGetProfile();

  const hour = new Date().getHours();

  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const date = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const userName = profileData?.data?.full_name ?? 'User';

  return (
    <header className="flex justify-between items-center px-6 py-[8px] w-full">
      <div className="flex items-center gap-18">
        <LogoSection />
        <div className="flex items-center gap-4">
          <div
            onClick={toggleSidebar}
            className="hidden md:flex justify-center items-center py-2 rounded-md w-8 h-8 cursor-pointer"
          >
            <Menu size={24} className="text-primary-400" />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-lg font-medium text-gray-700">
              {greeting}, <span className="text-primary-500">{userName}</span>
            </span>
            <span className="text-gray-500">|</span>
            <span className="text-base text-secondary-500 font-medium">{date}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ProfileSection />
      </div>
    </header>
  );
};

export default Header;

import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User2, UserRoundCog } from 'lucide-react';
import { PATH } from '@/constants/paths';
import { clearAllCookies } from '@/utils/cookie';
import { useGetProfile } from '@/pages/accountSettings/profile/hooks/useGetProfile';

const ProfileSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { profileData } = useGetProfile();

  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    clearAllCookies();
    navigate(PATH.login, { replace: true });
  };
  const handleAccountSettings = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-1 bg-gray-100 hover:bg-gray-100 p-1 rounded-full w-fit transition-colors duration-200 cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="rounded-full w-12 h-10 overflow-hidden">
          <img
            src={profileData?.data?.avatar}
            alt="Profile"
            className="w-full h-full object-cover size-3"
          />
        </div>
        <div className="flex justify-center items-center rounded-full w-10 h-10">
          <UserRoundCog className="w-6 h-6 text-primary-500" />
        </div>
      </div>

      {isOpen && (
        <div className="-right-2 z-50 absolute bg-white shadow-lg mt-2 border border-border-main rounded-md w-56 overflow-hidden">
          <div className="bg-fillbg px-4 py-3 border-b border-border-main">
            <div className="flex items-center gap-1 text-sm">
              <span className="font-semibold text-heading">Welcome,</span>
              <span className="font-semibold text-heading">
                {profileData?.data?.full_name || 'Admin'}
              </span>
            </div>
          </div>

          <div className="py-2">
            <Link
              to={PATH.accountSettings.profile}
              onClick={handleAccountSettings}
              className="flex items-center gap-3 hover:bg-secondary-50 px-4 py-2.5 w-full text-text-main text-sm transition-colors duration-150 hover:cursor-pointer"
            >
              <User2 className="w-4 h-4 text-black" />
              Account Settings
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 hover:bg-red-50 text-red-500 px-4 py-2.5 w-full text-danger-300 text-sm transition-colors duration-150 hover:cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;

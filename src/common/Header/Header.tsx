import LogoSection from './partials/LogoSection';
import NotificationSection from './partials/NotificationSection';
import ProfileSection from './partials/ProfileSection';
// import NotificationSection from './partials/NotificationSection';
import { IoIosMenu } from 'react-icons/io';

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="flex justify-between items-center px-6 py-[8px] w-full">
      <div className="flex items-center gap-18">
        <LogoSection />
        <div className="flex justify-center items-center">
          <div
            onClick={toggleSidebar}
            className="hidden md:flex justify-center items-center py-2 rounded-md w-8 h-8 cursor-pointer"
          >
            <IoIosMenu size={24} className='text-primary-400' />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <NotificationSection />
        <ProfileSection />
      </div>
    </header>
  );
};

export default Header;

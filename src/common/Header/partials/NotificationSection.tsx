import { BellIcon } from 'lucide-react';

const NotificationSection = () => {
  return (
    <div className="flex justify-center items-center border border-primary-100 p-2 rounded-full cursor-pointer">
      <BellIcon className="text-primary-500 w-5 h-5" />
    </div>
  );
};

export default NotificationSection;
import HeaderSection from '@/common/HeaderTabs';
import { locationHeaderItem } from './LocationHeaderTabs';
import { Outlet } from 'react-router-dom';

export default function LocationWrapper() {
  return (
    <>
      <HeaderSection items={locationHeaderItem} />
      <div className="flex-1 flex flex-col overflow-y-hidden">
        <Outlet />
      </div>
    </>
  );
}

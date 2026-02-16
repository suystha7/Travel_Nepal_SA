import HeaderSection from '@/common/HeaderTabs';
import { aboutHeaderItem } from './BlogHeaderTabs';
import { Outlet } from 'react-router-dom';

export default function BlogWrapper() {
  return (
    <>
      <HeaderSection items={aboutHeaderItem} />
      <div className="flex-1 flex flex-col overflow-y-hidden">
        <Outlet />
      </div>
    </>
  );
}

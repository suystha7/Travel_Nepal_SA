import HeaderSection from '@/common/HeaderTabs';
import { packageHeaderItem } from './PackageHeaderTabs';
import { Outlet } from 'react-router-dom';

export default function PackageWrapper() {
  return (
    <>
      <HeaderSection items={packageHeaderItem} />
      <div className="flex-1 flex flex-col overflow-y-hidden">
        <Outlet />
      </div>
    </>
  );
}

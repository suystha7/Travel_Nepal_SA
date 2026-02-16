import HeaderSection from '@/common/HeaderTabs';
import { aboutHeaderItem } from './AboutHeaderTabs';
import { Outlet } from 'react-router-dom';

export default function AboutWrapper() {
  return (
    <>
      <HeaderSection items={aboutHeaderItem} />
      <div className="flex-1 flex flex-col overflow-y-hidden">
        <Outlet />
      </div>
    </>
  );
}

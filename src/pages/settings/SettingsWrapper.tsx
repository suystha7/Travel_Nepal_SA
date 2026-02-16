import HeaderSection from '@/common/HeaderTabs';
import { settingsHeaderItem } from './SettingsHeaderTabs';
import { Outlet } from 'react-router-dom';

export default function SettingsWrapper() {
  return (
    <>
      <HeaderSection items={settingsHeaderItem} />
      <div className="flex-1 flex flex-col overflow-y-hidden">
        <Outlet />
      </div>
    </>
  );
}

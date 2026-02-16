import HeaderSection from '@/common/HeaderTabs';
import { accountSettingHeaderItem } from './AccountSettingHeaderTabs';
import { Outlet } from 'react-router-dom';

export default function AccountSettingWrapper() {
  return (
    <>
      <HeaderSection items={accountSettingHeaderItem} />
      <div className="flex-1 flex flex-col overflow-y-hidden">
        <Outlet />
      </div>
    </>
  );
}

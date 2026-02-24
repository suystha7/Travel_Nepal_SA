import HeaderSection from '@/common/HeaderTabs';
import { accountSettingHeaderItem } from './AccountSettingHeaderTabs';
import { useSearchParams } from 'react-router-dom';
import Profile from './profile/Profile';
import ChangePassword from './changePassword/ChangePassword';

export default function AccountSettingWrapper() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'profile';

  return (
    <>
      <HeaderSection items={accountSettingHeaderItem} />

      {tab === 'profile' ? <Profile /> : <ChangePassword />}
    </>
  );
}

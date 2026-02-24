import { PATH } from '@/constants/paths';
import AccountSettingWrapper from '@/pages/accountSettings/AccountSettingWrapper';
// import ResetPassword from '@/pages/accountSettings/resetPassword/ResetPassword';

export const accountSettingsRoutes = [
  {
    path: PATH.accountSettings.profile,
    element: <AccountSettingWrapper />,
  },
];

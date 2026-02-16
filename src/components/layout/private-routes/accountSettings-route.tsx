import { PATH } from '@/constants/paths';
import AccountSettingWrapper from '@/pages/accountSettings/AccountSettingWrapper';
import ChangePassword from '@/pages/accountSettings/changePassword/ChangePassword';
import Profile from '@/pages/accountSettings/profile/Profile';
// import ResetPassword from '@/pages/accountSettings/resetPassword/ResetPassword';

export const accountSettingsRoutes = [
  {
    element: <AccountSettingWrapper />,
    children: [
      {
        path: PATH.accountSettings.profile,
        element: <Profile />,
      },
      {
        path: PATH.accountSettings.changePassword,
        element: <ChangePassword />,
      },
    ],
  },
];

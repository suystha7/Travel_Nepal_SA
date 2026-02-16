import { PATH } from '@/constants/paths';
import { KeyRound, User2 } from 'lucide-react';

export const accountSettingHeaderItem = [
  {
    id: 'profile',
    icon: User2,
    label: 'Profile',
    active: false,
    link: PATH.accountSettings.profile,
  },
  {
    id: 'changePassword',
    icon: KeyRound,
    label: 'Change Password',
    active: false,
    link: PATH.accountSettings.changePassword,
  },
];

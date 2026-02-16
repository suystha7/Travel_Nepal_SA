import { PATH } from '@/constants/paths';
import { OrganizationSettings } from '@/pages/settings/organizationSettings/OrganizationSettings';
import Policy from '@/pages/settings/policy/Policy';
import StaticSEO from '@/pages/settings/seo/StaticSEO';
import SettingsWrapper from '@/pages/settings/SettingsWrapper';
import SocialMediaSettings from '@/pages/settings/socialMedia/SocialMediaSettings';

export const settingsRoutes = [
  {
    element: <SettingsWrapper />,
    children: [
      {
        path: PATH.settings.generalSettings,
        element: <OrganizationSettings />,
      },
      {
        path: PATH.settings.socialMedia,
        element: <SocialMediaSettings />,
      },
      {
        path: PATH.settings.seo,
        element: <StaticSEO />,
      },
      {
        path: PATH.settings.policy,
        element: <Policy />,
      },
    ],
  },
];

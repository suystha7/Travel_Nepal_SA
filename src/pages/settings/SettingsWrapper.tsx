import HeaderSection from '@/common/HeaderTabs';
import { useSearchParams } from 'react-router-dom';
import { OrganizationSettings } from './organizationSettings/OrganizationSettings';
import SocialMediaSettings from './socialMedia/SocialMediaSettings';
import StaticSEO from './seo/StaticSEO';
import Policy from './policy/Policy';
import { settingsHeaderItem } from './SettingsHeaderTabs';

export default function PackageWrapper() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'general-settings';

  const tabComponents: Record<string, React.ReactNode> = {
    'general-settings': <OrganizationSettings/>,
    'social-media': <SocialMediaSettings />,
    'static-seo': <StaticSEO />,
    'policy': <Policy />,
  };

  return (
    <>
      <HeaderSection items={settingsHeaderItem} />
      {tabComponents[tab]}
    </>
  );
}

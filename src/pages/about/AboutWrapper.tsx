import HeaderSection from '@/common/HeaderTabs';
import { useSearchParams } from 'react-router-dom';
import { aboutHeaderItem } from './AboutHeaderTabs';
import { AboutUs } from './aboutUs/AboutUs';
import WhoWeAre from './whoWeAre/WhoWeAre';
import { Stats } from './stats/Stats';
import Team from './team/Team';
import MissionVision from './missionVision/MissionVision';
import WhyUs from './whyUs/WhyUs';

export default function PackageWrapper() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'about';

  const tabComponents: Record<string, React.ReactNode> = {
    'about-us': <AboutUs />,
    'stats': <Stats />,
    'who-we-are': <WhoWeAre />,
    'team': <Team />,
    'mission-vision': <MissionVision />,
    'why-us': <WhyUs/>,
  };

  return (
    <>
      <HeaderSection items={aboutHeaderItem} />
      {tabComponents[tab]}
    </>
  );
}

import { PATH } from '@/constants/paths';
import { AboutUs } from '@/pages/about/aboutUs/AboutUs';
import AboutWrapper from '@/pages/about/AboutWrapper';
import MissionVision from '@/pages/about/missionVision/MissionVision';
import { Stats } from '@/pages/about/stats/Stats';
import Team from '@/pages/about/team/Team';
import WhoWeAre from '@/pages/about/whoWeAre/WhoWeAre';
import WhyUs from '@/pages/about/whyUs/WhyUs';

export const aboutRoutes = [
  {
    element: <AboutWrapper />,
    children: [
      {
        path: PATH.about.team,
        element: <Team />,
      },
      {
        path: PATH.about.about,
        element: <AboutUs />,
      },
      {
        path: PATH.about.missionVision,
        element: <MissionVision />,
      },
      {
        path: PATH.about.whyUs,
        element: <WhyUs />,
      },
      {
        path: PATH.about.stats,
        element: <Stats />,
      },
      {
        path: PATH.about.whoWeAre,
        element: <WhoWeAre />,
      },
    ],
  },
];

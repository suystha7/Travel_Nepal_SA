import { PATH } from '@/constants/paths';
import { AboutUs } from '@/pages/about/aboutUs/AboutUs';
import AboutWrapper from '@/pages/about/AboutWrapper';
import { Stats } from '@/pages/about/stats/Stats';
import Team from '@/pages/about/team/Team';
import WhoWeAre from '@/pages/about/whoWeAre/WhoWeAre';

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

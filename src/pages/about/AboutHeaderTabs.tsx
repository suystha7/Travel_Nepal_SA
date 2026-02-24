import { PATH } from '@/constants/paths';
import { ChartLine, Info, Target, Users2 } from 'lucide-react';
import { IoPeople } from 'react-icons/io5';
import { MdQuestionMark } from 'react-icons/md';

export const aboutHeaderItem = [
  {
    id: 'about-us',
    icon: Info,
    label: 'About Us',
    value: 'about-us',
    active: false,
    link: PATH.about.about,
  },
  {
    id: 'who-we-are',
    icon: IoPeople,
    label: 'Who We Are',
    value: 'who-we-are',
    active: false,
    link: PATH.about.whoWeAre,
  },
  {
    id: 'stats',
    icon: ChartLine,
    label: 'Stats',
    value: 'stats',
    active: false,
    link: PATH.about.stats,
  },
  {
    id: 'mission-vision',
    icon: Target,
    label: 'Mission/Vision',
    value: 'mission-vision',
    active: false,
    link: PATH.about.missionVision,
  },
  {
    id: 'why-us',
    icon: MdQuestionMark,
    label: 'Why Us',
    value: 'why-us',
    active: false,
    link: PATH.about.whyUs,
  },

  {
    id: 'team',
    icon: Users2,
    label: 'Teams',
    value: 'team',
    active: false,
    link: PATH.about.team,
  },
];

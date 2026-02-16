import { PATH } from '@/constants/paths';
import { ChartLine, Info, Users2 } from 'lucide-react';
import { IoPeople } from 'react-icons/io5';

export const aboutHeaderItem = [
  {
    id: 'aboutUs',
    icon: Info,
    label: 'About Us',
    active: false,
    link: PATH.about.about,
  },
  {
    id: 'stats',
    icon: ChartLine,
    label: 'Stats',
    active: false,
    link: PATH.about.stats,
  },
  {
    id: 'whoWeAre',
    icon: IoPeople,
    label: 'Who We Are',
    active: false,
    link: PATH.about.whoWeAre,
  },
  {
    id: 'team',
    icon: Users2,
    label: 'Team',
    active: false,
    link: PATH.about.team,
  },
];

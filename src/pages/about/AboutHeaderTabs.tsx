import { PATH } from '@/constants/paths';
import { ChartLine, Info, Target, Users2 } from 'lucide-react';
import { IoPeople } from 'react-icons/io5';
import { MdQuestionMark } from 'react-icons/md';

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
    id: 'missionVision',
    icon: Target,
    label: 'Mission/Vision',
    active: false,
    link: PATH.about.missionVision, 
  },
  {
    id: 'whyUs',
    icon: MdQuestionMark,
    label: 'Why Us',
    active: false,
    link: PATH.about.whyUs,
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

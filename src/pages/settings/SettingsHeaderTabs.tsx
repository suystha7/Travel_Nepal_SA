import { PATH } from '@/constants/paths';
import { ChartPie, Cog, ScrollText, TrendingUp } from 'lucide-react';

export const settingsHeaderItem = [
  {
    id: 'general-settings',
    icon: Cog,
    label: 'General Settings',
    active: false,
    link: PATH.settings.settings,
  },
  {
    id: 'policy',
    icon: ScrollText,
    label: 'Policy',
    active: false,
    link: PATH.settings.policy,
  },
  {
    id: 'social-media',
    icon: ChartPie,
    label: 'Social Media',
    active: false,
    link: PATH.settings.socialMedia,
  },
  {
    id: 'static-seo',
    icon: TrendingUp,
    label: 'Static SEO',
    active: false,
    link: PATH.settings.seo,
  },
  
];

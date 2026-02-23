import { PATH } from '@/constants/paths';
import { ChartPie, Cog, ScrollText, TrendingUp } from 'lucide-react';

export const settingsHeaderItem = [
  {
    id: 'generalSettings',
    icon: Cog,
    label: 'General Settings',
    active: false,
    link: PATH.settings.generalSettings,
  },
  {
    id: 'policy',
    icon: ScrollText,
    label: 'Policy',
    active: false,
    link: PATH.settings.policy,
  },
  {
    id: 'socialMedia',
    icon: ChartPie,
    label: 'Social Media',
    active: false,
    link: PATH.settings.socialMedia,
  },
  {
    id: 'staticSeo',
    icon: TrendingUp,
    label: 'Static SEO',
    active: false,
    link: PATH.settings.seo,
  },
  
];

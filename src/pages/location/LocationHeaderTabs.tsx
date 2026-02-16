import { PATH } from '@/constants/paths';
import { Globe, Building2 } from 'lucide-react';

export const locationHeaderItem = [
  {
    id: 'country',
    icon: Globe,
    label: 'Country',
    active: false,
    link: PATH.location.country,
  },
  {
    id: 'city',
    icon: Building2,
    label: 'City',
    active: false,
    link: PATH.location.city,
  },
];

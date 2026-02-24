import { PATH } from '@/constants/paths';
import { Globe, Building2 } from 'lucide-react';

export const locationHeaderItem = [
  {
    id: 'country',
    icon: Globe,
    label: 'Country',
    value: 'country',
    active: false,
    link: PATH.location.country,
  },
  {
    id: 'city',
    icon: Building2,
    label: 'City',
    value: 'city',
    active: false,
    link: PATH.location.city,
  },
];

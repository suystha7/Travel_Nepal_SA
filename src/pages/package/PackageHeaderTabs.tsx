import { PATH } from '@/constants/paths';
import { Box, ChartColumnBig, Images, Video } from 'lucide-react';

export const packageHeaderItem = [
  {
    id: 'packageType',
    icon: Box,
    label: 'Type',
    active: false,
    link: PATH.packages.packageType,
  },
  {
    id: 'packageCategory',
    icon: ChartColumnBig,
    label: ' Category',
    active: false,
    link: PATH.packages.packageCategory,
  },
  {
    id: 'package',
    icon: Box,
    label: 'Packages',
    active: false,
    link: PATH.packages.packageOverview,
  },
  {
    id: 'packageGallery',
    icon: Images,
    label: 'Gallery',
    active: false,
    link: PATH.packages.packageGallery,
  },
  {
    id: 'packageVideo',
    icon: Video,
    label: 'Videos',
    active: false,
    link: PATH.packages.packageVideo,
  },
];

import { PATH } from '@/constants/paths';
import { Box, ChartColumnBig, Images, Video } from 'lucide-react';
import { TbSeo } from 'react-icons/tb';

export const packageHeaderItem = [
  {
    id: 'package-type',
    icon: Box,
    label: 'Type',
    active: false,
    link: PATH.packages.packageType,
  },
  {
    id: 'package-category',
    icon: ChartColumnBig,
    label: 'Category',
    active: false,
    link: PATH.packages.packageCategory,
  },
  {
    id: 'package',
    icon: Box,
    label: 'Overview',
    active: false,
    link: PATH.packages.packages,
  },
  {
    id: 'package-seo',
    icon: TbSeo,
    label: 'SEO',
    active: false,
    link: PATH.packages.packageSeo,
  },
  {
    id: 'package-gallery',
    icon: Images,
    label: 'Gallery',
    active: false,
    link: PATH.packages.packageGallery,
  },  
  {
    id: 'package-image-seo',
    icon: TbSeo,
    label: 'Image SEO',
    active: false,
    link: PATH.packages.packageImageSeo,
  },
  {
    id: 'package-video',
    icon: Video,
    label: 'Videos',
    active: false,
    link: PATH.packages.packageVideo,
  },
];

import { PATH } from '@/constants/paths';
import { Image, ChartBar, Binoculars } from 'lucide-react';

export const aboutHeaderItem = [
  {
    id: 'blogCategory',
    icon: ChartBar,
    label: 'Blog Category',
    active: false,
    link: PATH.blogs.blogCategory,
  },
  {
    id: 'blog',
    icon: Binoculars,
    label: 'Blog',
    active: false,
    link: PATH.blogs.blog,
  },
  {
    id: 'blogImage',
    icon: Image,
    label: 'Blog Image',
    active: false,
    link: PATH.blogs.blogImage,
  },
];

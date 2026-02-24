import { PATH } from '@/constants/paths';
import { Image, ChartBar, Binoculars } from 'lucide-react';
import { TbSeo } from "react-icons/tb";

export const blogHeaderItem = [
  {
    id: 'blog-category',
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
    id: 'blog-image',
    icon: Image,
    label: 'Blog Image',
    active: false,
    link: PATH.blogs.blogImage,
  },
  {
    id: 'blog-seo',
    icon: TbSeo,
    label: 'Blog SEO',
    active: false,
    link: PATH.blogs.blogSeo,
  },
  {
    id: 'blog-image-seo',
    icon: TbSeo,
    label: 'Blog Image SEO',
    active: false,
    link: PATH.blogs.blogImageSeo,
  },
];

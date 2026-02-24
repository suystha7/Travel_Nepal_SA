import { PATH } from '@/constants/paths';
import BlogWrapper from '@/pages/blogs/BlogWrapper';

export const blogRoutes = [
  {
    path: PATH.blogs.blog,
    element: <BlogWrapper />,
  },
];

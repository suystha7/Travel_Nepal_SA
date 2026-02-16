import { PATH } from '@/constants/paths';
import Blog from '@/pages/blogs/blog/Blog';
import BlogCategory from '@/pages/blogs/blogCategory/BlogCategory';
import BlogImage from '@/pages/blogs/blogImage/BlogImage';
import BlogWrapper from '@/pages/blogs/BlogWrapper';

export const blogRoutes = [
  {
    element: <BlogWrapper />,
    children: [
      {
        path: PATH.blogs.blogCategory,
        element: <BlogCategory />,
      },
      {
        path: PATH.blogs.blog,
        element: <Blog />,
      },
      {
        path: PATH.blogs.blogImage,
        element: <BlogImage />,
      },
    ],
  },
];

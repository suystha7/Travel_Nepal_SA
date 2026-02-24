import HeaderSection from '@/common/HeaderTabs';
import { useSearchParams } from 'react-router-dom';
import BlogCategory from './blogCategory/BlogCategory';
import Blog from './blog/Blog';
import BlogImage from './blogImage/BlogImage';
import { blogHeaderItem } from './BlogHeaderTabs';
import BlogSeo from './blogSeo/BlogSeo';
import BlogImageSeo from './blogImageSeo/BlogImageSeo';

export default function BlogWrapper() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'blog-category';
  const tabComponents: Record<string, React.ReactNode> = {
    'blog-category': <BlogCategory />,
    'blog': <Blog />,
    'blog-image': <BlogImage />,
    'blog-seo': <BlogSeo />,
    'blog-image-seo': <BlogImageSeo />,
  };

  return (
    <>
      <HeaderSection items={blogHeaderItem}/>
      {tabComponents[tab]}
    </>
  );
}

import HeaderSection from '@/common/HeaderTabs';
import { packageHeaderItem } from './PackageHeaderTabs';
import { useSearchParams } from 'react-router-dom';
import PackageType from '@/pages/package/packageType/PackageType';
import PackageCategory from '@/pages/package/packageCategory/PackageCategory';
import Package from '@/pages/package/package/Package';
import PackageGallery from '@/pages/package/packageGallery/PackageGallery';
import PackageVideo from '@/pages/package/packageVideo/PackageVideo';
import PackageSeo from './packageSeo/PackageSeo';
import PackageImageSeo from './packageImageSeo/PackageImageSeo';

export default function PackageWrapper() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'package-type';

  const tabComponents: Record<string, React.ReactNode> = {
    'package-type': <PackageType />,
    'package-category': <PackageCategory />,
    package: <Package />,
    'package-gallery': <PackageGallery />,
    'package-video': <PackageVideo />,
    'package-seo': <PackageSeo />,
    'package-image-seo': <PackageImageSeo />,
  };

  return (
    <>
      <HeaderSection items={packageHeaderItem} />
      {tabComponents[tab]}
    </>
  );
}

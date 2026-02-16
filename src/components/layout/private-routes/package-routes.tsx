import { PATH } from '@/constants/paths';
import PackageWrapper from '@/pages/package/PackageWrapper';
import Package from '@/pages/package/package/Package';
import PackageCategory from '@/pages/package/packageCategory/PackageCategory';
import PackageGallery from '@/pages/package/packageGallery/PackageGallery';
import PackageType from '@/pages/package/packageType/PackageType';
import PackageVideo from '@/pages/package/packageVideo/PackageVideo';

export const packageRoutes = [
  {
    element: <PackageWrapper />,
    children: [
      {
        path: PATH.packages.packageType,
        element: <PackageType />,
      },
      {
        path: PATH.packages.packageCategory,
        element: <PackageCategory />,
      },
      {
        path: PATH.packages.packageOverview,
        element: <Package />,
      },
      {
        path: PATH.packages.packageGallery,
        element: <PackageGallery />,
        id: 'packageGallery',
        label: 'Gallery',
      },
      {
        path: PATH.packages.packageVideo,
        element: <PackageVideo />,
        id: 'packageVideo',
        label: 'Video',
      },
    ],
  },
];

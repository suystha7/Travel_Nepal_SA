import { PATH } from '@/constants/paths';
import PackageWrapper from '@/pages/package/PackageWrapper';

export const packageRoutes = [
  {
    path: PATH.packages.packages,
    element: <PackageWrapper />,
  },
];

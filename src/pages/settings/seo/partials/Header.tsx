import Breadcrumb from '@/components/BreadCrum';
import { PATH } from '@/constants/paths';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div>
      <div className="bg-white px-4 py-3 rounded-md">
        <Breadcrumb
          items={[
            { name: 'Dashboard', link: PATH.dashboard },
            { name: 'settings' },
            { name: 'Static SEO' },
          ]}
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-col gap-1 px-1">
          <p className="text-primary-900 typography-semi-bold-medium">Static SEO</p>
          <p className="text-gray-500 typography-regular-extra-small">Manage Static SEO's</p>
        </div>
      </div>
    </div>
  );
};

export default Header;

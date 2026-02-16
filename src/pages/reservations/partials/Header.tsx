import Breadcrumb from '@/components/BreadCrum';
import { PATH } from '@/constants/paths';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div>
      <div className="bg-white px-4 py-3 rounded-md">
        <Breadcrumb
          items={[{ name: 'Dashboard', link: PATH.dashboard }, { name: 'Reservation' }]}
        />
      </div>
    </div>
  );
};

export default Header;

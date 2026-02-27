import Breadcrumb from '@/components/BreadCrum';
import { PATH } from '@/constants/paths';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          { name: 'Dashboard', link: PATH.dashboard },
          { name: 'Settings' },
          { name: 'Policy' },
        ]}
      />
    </div>
  );
};

export default Header;

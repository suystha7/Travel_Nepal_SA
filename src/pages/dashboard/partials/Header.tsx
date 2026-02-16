import Breadcrumb from '@/components/BreadCrum';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="px-4 py-3 rounded-md bg-white container-shadow">
      <Breadcrumb items={[{ name: 'Dashboard' }]} />
    </div>
  );
};

export default Header;

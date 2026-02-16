import Breadcrumb from '@/components/BreadCrum';
import React from 'react';

interface HeaderProps {
  items: { name: string; link?: string }[];
}

const Header: React.FC<HeaderProps> = ({ items }) => {
  return (
    <div className="bg-white px-4 py-3 rounded-md">
      <Breadcrumb items={items} />
    </div>
  );
};

export default Header;

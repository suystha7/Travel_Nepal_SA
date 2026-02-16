import React, { useState, useEffect } from 'react';
import { IoChevronDownOutline, IoChevronForward } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { mainMenuItems } from './data/SidebarData';
import type { MenuItem } from '@/interface/sidebar.interface';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const { role } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const [hoveredParentId, setHoveredParentId] = useState<string | null>(null);
  const [hoveredChildId, setHoveredChildId] = useState<string | null>(null);

  const isItemActive = (item: MenuItem): boolean => {
    if (item.link === currentPath) return true;
    if (item.children) return item.children.some(child => isItemActive(child));
    return false;
  };

  useEffect(() => {
    const activeParents = mainMenuItems.filter(item => isItemActive(item)).map(item => item.id);
    setOpenDropdowns(activeParents);
  }, [currentPath]);

  const toggleDropdown = (id: string) => {
    setOpenDropdowns(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderMenuItems = (items: MenuItem[], level: number = 0): React.JSX.Element[] => {
    return items.map((item, index) => {
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openDropdowns.includes(item.id);
      const isHoveredParent = hoveredParentId === item.id;
      const isActive = isItemActive(item);

      return (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => {
            if (!isSidebarOpen && hasChildren) setHoveredParentId(item.id);
          }}
          onMouseLeave={() => {
            if (!isSidebarOpen && hasChildren) {
              setHoveredParentId(null);
              setHoveredChildId(null);
            }
          }}
        >
          <Link
            to={item.link ?? '#'}
            className={`flex items-center justify-between px-3 ${
              level <= 1 ? 'py-3 mb-1' : 'py-2'
            } rounded-md cursor-pointer transition-colors ${
              isActive ? 'bg-primary-500 text-white' : 'text-gray-500 hover:bg-primary-50'
            }`}
            onClick={() => hasChildren && isSidebarOpen && toggleDropdown(item.id)}
            style={{ paddingLeft: `${level * 16 + 12}px` }}
          >
            <div className="flex items-center gap-3">
              {item.icon && <item.icon className="w-5 h-5" />}
              <span className={`${isSidebarOpen ? 'block' : 'hidden'} font-[400] text-sm`}>
                {item.label}
              </span>
            </div>

            {hasChildren && isSidebarOpen && (
              <span className="text-xs">
                {isOpen ? <IoChevronDownOutline size={16} /> : <IoChevronForward size={16} />}
              </span>
            )}
          </Link>

          {hasChildren && isSidebarOpen && isOpen && (
            <div className="space-y-1">{renderMenuItems(item.children!, level + 1)}</div>
          )}

          {!isSidebarOpen && hasChildren && isHoveredParent && (
            <div className="absolute top-0 left-full z-50 w-36 bg-white shadow-lg px-2 py-2 rounded-md">
              {item.children!.map((child, idx) => {
                const hasNestedChildren = child.children?.length ?? 0 > 0;
                const isHoveredChild = hoveredChildId === child.id;
                const childActive = child.link === currentPath || isItemActive(child);

                return (
                  <div
                    key={idx}
                    className="relative group"
                    onMouseEnter={() => hasNestedChildren && setHoveredChildId(child.id)}
                    onMouseLeave={() => hasNestedChildren && setHoveredChildId(null)}
                  >
                    <Link
                      to={child.link ?? '#'}
                      className={`flex justify-between items-center px-4 py-2 text-sm cursor-pointer rounded 
                      ${
                        childActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-text-main hover:bg-primary-50'
                      }`}
                    >
                      <span>{child.label}</span>
                      {hasNestedChildren && <IoChevronForward size={14} className="opacity-70" />}
                    </Link>

                    {hasNestedChildren && isHoveredChild && (
                      <div className="absolute top-0 left-full z-50 w-48 bg-white shadow-lg py-2 rounded-md">
                        {child.children!.map((nestedChild, nestedIdx) => {
                          const nestedActive = nestedChild.link === currentPath;

                          return (
                            <Link
                              to={nestedChild.link ?? '#'}
                              key={nestedIdx}
                              className={`block px-4 py-2 text-sm rounded cursor-pointer
                                ${
                                  nestedActive
                                    ? 'bg-primary-100 text-primary-700'
                                    : 'hover:bg-primary-50 text-text-main'
                                }`}
                            >
                              {nestedChild.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={`hidden md:relative md:block bg-white p-4 pt-6 h-full font-medium no-scrollbar transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64 overflow-y-scroll scrollbar-hidden' : 'w-20'
      }`}
    >
      <div className="mb-3">
        {role === 'admin' ? renderMenuItems(mainMenuItems) : renderMenuItems(mainMenuItems)}
      </div>
    </div>
  );
};

export default Sidebar;

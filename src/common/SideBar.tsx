import React, { useState, useEffect, useMemo } from 'react';
import { IoChevronDownOutline, IoChevronForward } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { mainMenuGroups } from './data/SidebarData';
import type { MenuItem } from '@/interface/sidebar.interface';

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const [hoveredParentId, setHoveredParentId] = useState<string | null>(null);
  const [hoveredChildId, setHoveredChildId] = useState<string | null>(null);

  const isItemActive = useMemo(() => {
    const checkActive = (item: MenuItem): boolean => {
      if (item.link === currentPath) return true;
      if (item.children) return item.children.some(child => checkActive(child));
      return false;
    };
    return checkActive;
  }, [currentPath]);

  useEffect(() => {
    const activeIds: string[] = [];
    mainMenuGroups.forEach(group => {
      group.items.forEach(item => {
        if (isItemActive(item as MenuItem)) activeIds.push(item.id);
      });
    });
    setOpenDropdowns(prev => Array.from(new Set([...prev, ...activeIds])));
  }, [currentPath, isItemActive]);

  const toggleDropdown = (id: string) => {
    setOpenDropdowns(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderMenuItems = (items: MenuItem[], level: number = 0): React.JSX.Element[] => {
    return items.map((item, index) => {
      const hasChildren = !!(item.children && item.children.length > 0);
      const isOpen = openDropdowns.includes(item.id);
      const isActive = isItemActive(item);

      return (
        <div
          key={item.id || index}
          className="relative"
          onMouseEnter={() => !isSidebarOpen && hasChildren && setHoveredParentId(item.id)}
          onMouseLeave={() => {
            if (!isSidebarOpen) {
              setHoveredParentId(null);
              setHoveredChildId(null);
            }
          }}
        >
          <Link
            to={item.link ?? '#'}
            className={`flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200 ${
              isActive 
                ? 'bg-primary-500 text-white' 
                : 'text-gray-500 hover:bg-primary-50 hover:text-primary-600'
            }`}
            onClick={() => hasChildren && isSidebarOpen && toggleDropdown(item.id)}
            style={{ paddingLeft: isSidebarOpen ? `${level * 12 + 12}px` : '12px' }}
          >
            <div className="flex items-center gap-3">
              {item.icon && <item.icon size={20} className="flex-shrink-0" />}
              <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${
                isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
              }`}>
                {item.label}
              </span>
            </div>

            {hasChildren && isSidebarOpen && (
              <span className="transition-transform duration-200">
                {isOpen ? <IoChevronDownOutline size={16} /> : <IoChevronForward size={16} />}
              </span>
            )}
          </Link>

          {hasChildren && isSidebarOpen && isOpen && (
            <div className="mt-1 ml-2 border-l border-gray-100 space-y-1">
              {renderMenuItems(item.children!, level + 1)}
            </div>
          )}

          {!isSidebarOpen && hasChildren && hoveredParentId === item.id && (
            <div className="absolute top-0 left-full z-[100] ml-2 w-48 bg-white shadow-xl border border-gray-100 rounded-xl py-2 animate-in fade-in slide-in-from-left-2">
              <div className="px-4 py-2 mb-1 border-b border-gra-50">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">{item.label}</span>
              </div>
              {item.children!.map((child, idx) => {
                const hasNested = !!(child.children?.length);
                const isChildActive = child.link === currentPath || isItemActive(child);

                return (
                  <div 
                    key={child.id || idx} 
                    className="relative"
                    onMouseEnter={() => hasNested && setHoveredChildId(child.id)}
                    onMouseLeave={() => hasNested && setHoveredChildId(null)}
                  >
                    <Link
                      to={child.link ?? '#'}
                      className={`flex justify-between items-center px-4 py-2 text-sm transition-colors ${
                        isChildActive ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-gra-600 hover:bg-gra-50'
                      }`}
                    >
                      <span>{child.label}</span>
                      {hasNested && <IoChevronForward size={14} />}
                    </Link>

                    {hasNested && hoveredChildId === child.id && (
                      <div className="absolute top-0 left-full ml-1 w-48 bg-white shadow-xl border border-gray-100 rounded-xl py-2">
                        {child.children!.map((nested, nIdx) => (
                          <Link
                            key={nested.id || nIdx}
                            to={nested.link ?? '#'}
                            className={`block px-4 py-2 text-sm ${
                              nested.link === currentPath ? 'text-primary-600 font-semibold bg-primary-50' : 'text-gra-600 hover:bg-gra-50'
                            }`}
                          >
                            {nested.label}
                          </Link>
                        ))}
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
    <aside
      className={`hidden md:flex flex-col bg-white h-full transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className={`flex-1 py-6 no-scrollbar ${isSidebarOpen ? 'overflow-y-auto px-4' : 'px-2'}`}>
        {mainMenuGroups.map((group, idx) => (
          <div key={idx} className={`${idx !== 0 ? 'mt-8' : ''}`}>
            {isSidebarOpen && (
              <h3 className="px-3 mb-3 text-xs font-bold uppercase tracking-widest text-primary-500">
                {group.title}
              </h3>
            )}
            <div className="space-y-1">
              {renderMenuItems(group.items as MenuItem[])}
            </div>
            {!isSidebarOpen && idx !== mainMenuGroups.length - 1 && (
              <div className="mx-4 my-6 border-t border-gray-100" />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
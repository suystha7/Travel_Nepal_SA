import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  link?: string;
  isHome?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  homeIcon?: React.JSX.Element;
  className?: string;
  isLastClassName?: string;
}

function Breadcrumb({
  items,
  separator = '/',
  homeIcon,
  className = '',
  isLastClassName = 'text-gray-700 font-medium',
}: BreadcrumbProps) {
  return (
    <nav className={`flex items-center ${className} p-1`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-base">
        {items?.map((item: BreadcrumbItem, index: number) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={index}>
              <li aria-current={isLast ? 'page' : undefined} className="flex items-center gap-1">
                {item.link ? (
                  <Link
                    to={item.link}
                    className="text-gray-500 hover:text-primary-500 transition-colors duration-200 flex items-center gap-1"
                  >
                    {item.isHome ? (homeIcon ?? 'Home') : item.name}
                  </Link>
                ) : (
                  <span className={`text-primary-500 line-clamp-1 ${isLastClassName}`}>
                    {item.name}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="flex items-center text-gray-400">
                  {separator}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;

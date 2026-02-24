import { cn } from '@/lib/utils';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

interface IHeaderItem {
  id: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  link: string;
}

interface IUserHeaderProps {
  items?: IHeaderItem[];
  classname?: string;
}

const HeaderSection = ({ items, classname }: IUserHeaderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const defaultTab = items?.[0]?.id;
  const activeTab = searchParams.get('tab') ?? defaultTab;

  useEffect(() => {
    if (!searchParams.get('tab') && defaultTab) {
      setSearchParams({ tab: defaultTab });
    }
  }, [searchParams, setSearchParams, defaultTab]);

  const segments = pathname.split('/').filter(Boolean);

  const breadcrumb = segments.map((segment, i) => ({
    label: segment.replace(/-/g, ' '),
    path: '/' + segments.slice(0, i + 1).join('/'),
  }));

  return (
    <section className={cn('w-full', classname)}>
      <nav className="text-sm mb-4 text-gray-500 bg-white p-4 rounded-md">
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/" className="hover:text-primary-500 text-gray-400">
              Dashboard
            </Link>
          </li>

          {breadcrumb.map((item, i) => (
            <li key={item.path} className="flex items-center gap-2 text-gray-400">
              /
              {i === breadcrumb.length - 1 ? (
                <span className="text-primary-500 font-medium capitalize">{item.label}</span>
              ) : (
                <span className="hover:text-primary-500 capitalize">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
        {items?.map(item => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              to={`${pathname}?tab=${item.id}`}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm rounded-md flex-shrink-0 transition',
                isActive
                  ? 'bg-primary-500 text-white font-medium'
                  : 'bg-white text-gray-700 hover:bg-primary-500 hover:text-white'
              )}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default HeaderSection;

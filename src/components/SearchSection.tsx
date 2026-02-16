import { Search, Settings2 } from 'lucide-react';
import type React from 'react';

interface ISearchSectionProps {
  showAdjustmentIcon?: boolean;
  styleClass?: string;
  search?: string;
  setSearch?: (value: string) => void;
}

const SearchSection = ({
  showAdjustmentIcon = false,
  styleClass,
  search,
  setSearch,
}: ISearchSectionProps) => {
  return (
    <div
      className={`flex items-center bg-white px-3 border border-primary-400 rounded-md ${styleClass}`}
    >
      <Search size={20} className="mr-3 text-primary-400" />
      <input
        type="text"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch?.(e.target.value);
        }}
        placeholder="Search"
        className="flex-1 bg-transparent outline-none placeholder:font-[500] text-primary-500 placeholder:text-primary-400 placeholder:text-sm h-10"
      />
      {showAdjustmentIcon && (
        <div className="flex justify-center items-center bg-secondary-50 ml-3 p-1 rounded-xl">
          <Settings2 size={20} className="text-secondary-600" />
        </div>
      )}
    </div>
  );
};

export default SearchSection;

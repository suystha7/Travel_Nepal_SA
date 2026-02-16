import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  className?: string;
}

const GlobalSearchInput: React.FC<IProps> = ({ wrapperClassName, className, ...props }) => {
  return (
    <div className={cn('relative flex justify-between items-center w-full', wrapperClassName)}>
      <Search className="top-1/2 left-3 absolute text-primary-500 -translate-y-1/2" size={18} />
      <input
        type="text"
        className={cn(
          'bg-white py-2 pr-4 pl-10 border border-gray-100 rounded-md w-full font-inter font-normal text-[#969696] text-[0.8125rem]',
          className
        )}
        placeholder="Search..."
        {...props}
      />
    </div>
  );
};

export default GlobalSearchInput;

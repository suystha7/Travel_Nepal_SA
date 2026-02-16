import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IOption {
  label: string;
  value: string;
  icon?: React.FC;
}

interface IProps {
  label: string;
  name: string;
  placeholder: string;
  option: IOption[];
}

const DropDownShadcn: React.FC<IProps> = ({ label, name, placeholder, option }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="typography-regular-small text-gray-800" htmlFor={name}>
        {label}
      </label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{placeholder}</SelectLabel>
            {option.map((item, index) => (
              <SelectItem key={index} value={item.value}>
                {' '}
                {item.icon && <item.icon />} {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropDownShadcn;

import React from 'react';
import Select, { components, type DropdownIndicatorProps } from 'react-select';
import { useField, useFormikContext, ErrorMessage } from 'formik';
import { ChevronDown } from 'lucide-react';
import type { IOption } from '@/types/common';

interface IInputReactSelect {
  name: string;
  label: string;
  options: IOption[];
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  labelClassName?: string;
  required?: boolean;
  placeholder?: string;
  wrapperClassName?: string;
  isDisabled?: boolean;
}

const ReactSelect: React.FC<IInputReactSelect> = ({
  name,
  label,
  options,
  className = '',
  setSearch,
  labelClassName = '',
  required = false,
  placeholder = 'Select an option',
  wrapperClassName = '',
  isDisabled = false,
}) => {
  const [field, meta] = useField<string>(name);
  const { setFieldValue } = useFormikContext<Record<string, string>>();

  const customComponents = {
    DropdownIndicator: (props: DropdownIndicatorProps<IOption, false>) => (
      <components.DropdownIndicator {...props}>
        <ChevronDown size={18} />
      </components.DropdownIndicator>
    ),
    IndicatorSeparator: () => null,
  };

  const selectedOption = options.find(opt => opt.value === field.value) || null;

  return (
    <div className={`w-full flex flex-col gap-3 ${wrapperClassName}`}>
      <label className={`flex items-center gap-1 ${labelClassName}`} htmlFor={name}>
        <p className="text-gray-900 text-sm font-medium shrink-0">{label}</p>
        {required && <p className="text-error">*</p>}
      </label>

      <div className="relative">
        <Select<IOption, false>
          id={name}
          name={name}
          value={selectedOption}
          onChange={option => setFieldValue(name, option?.value ?? '')}
          onInputChange={value => setSearch?.(value)}
          options={options}
          components={customComponents}
          placeholder={placeholder}
          isDisabled={isDisabled}
          classNamePrefix="react-select"
          className={`react-select-container ${className}`}
          styles={{
            control: base => ({
              ...base,
              padding: '6px',
              borderRadius: '0.5rem',
              borderColor: meta.touched && meta.error ? '#EF4444' : '#E5E7EB',
              boxShadow: 'none',
              '&:hover': { borderColor: '#3B82F6' },
              minHeight: '20px',
            }),
            placeholder: base => ({ ...base, fontSize: '0.875rem', color: '#9CA3AF' }),
            singleValue: base => ({ ...base, fontSize: '0.875rem', color: '#111827' }),
            option: base => ({ ...base, fontSize: '0.875rem' }),
          }}
        />
      </div>

      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default ReactSelect;

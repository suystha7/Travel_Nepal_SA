import React from 'react';
import Select, { components } from 'react-select';
import { useField, useFormikContext, ErrorMessage } from 'formik';
import { Search } from 'lucide-react';

export interface IOption {
  label: string;
  value: string | number;
}

interface ISearchSelect {
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
  isClearable?: boolean;
  onChange?: (option: IOption | IOption[] | null) => void;
  isMulti?: boolean;
}

const SearchSelect: React.FC<ISearchSelect> = ({
  name,
  label,
  options,
  className = '',
  setSearch,
  labelClassName = '',
  required = false,
  placeholder = 'Search or select',
  wrapperClassName = '',
  isDisabled = false,
  isClearable = true,
  isMulti = false,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const customComponents = {
    DropdownIndicator: (props: any) => (
      <components.DropdownIndicator {...props}>
        <Search className="w-4 h-4 text-gray-500" />
      </components.DropdownIndicator>
    ),
    IndicatorSeparator: () => null,
  };

  const selectedValue = React.useMemo(() => {
    if (!Array.isArray(options)) return isMulti ? [] : null;

    if (isMulti) {
      const valuesArray = Array.isArray(field.value) ? field.value : [];
      return options.filter(opt => valuesArray.includes(opt.value));
    } else {
      return options.find(opt => opt.value === field.value) || null;
    }
  }, [field.value, options, isMulti]);

  return (
    <div className={`w-full flex flex-col gap-3 ${wrapperClassName}`}>
      <label className={`flex items-center gap-1 ${labelClassName}`} htmlFor={name}>
        <p className="text-gray-900 typography-regular-small shrink-0">{label}</p>
        {required && <p className="text-error">*</p>}
      </label>

      <Select
        id={name}
        name={name}
        value={selectedValue}
        onChange={option => {
          if (isMulti) {
            setFieldValue(name, (option as IOption[])?.map(o => o.value) || []);
          } else {
            setFieldValue(name, (option as IOption)?.value || '');
          }
        }}
        onInputChange={value => setSearch?.(value)}
        options={options}
        isSearchable
        isClearable={isClearable}
        isDisabled={isDisabled}
        placeholder={placeholder}
        components={customComponents}
        isMulti={isMulti}
        classNamePrefix="react-select"
        className={`react-select-container ${className}`}
        styles={{
          control: base => ({
            ...base,
            padding: '6px',
            borderRadius: '0.5rem',
            borderColor: meta.touched && meta.error ? '#EF4444' : '#E5E7EB',
            boxShadow: 'none',
            '&:hover': {
              borderColor: '#3B82F6',
            },
            minHeight: '42px',
          }),
          placeholder: base => ({
            ...base,
            fontSize: '0.875rem',
            color: '#9CA3AF',
          }),
          singleValue: base => ({
            ...base,
            fontSize: '0.7rem',
            color: '#111827',
          }),
          multiValue: base => ({
            ...base,
            fontSize: '0.7rem',
          }),
          option: base => ({
            ...base,
            fontSize: '0.7rem',
          }),
        }}
      />

      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default SearchSelect;

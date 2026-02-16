import React from 'react';
import { useField, useFormikContext, ErrorMessage } from 'formik';
import Select from 'react-select';

interface Option {
  label: string;
  value: string | number;
}

interface IInputSelectMulti {
  name: string;
  label: string;
  options: Option[];
  className?: string;
  labelClassName?: string;
  required?: boolean;
  placeholder: string;
  wrapperClassName?: string;
}

const InputSelectMulti: React.FC<IInputSelectMulti> = ({
  name,
  label,
  options,
  className,
  labelClassName,
  required,
  placeholder,
  wrapperClassName,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const getBorderClass = () => {
    if (meta.touched && meta.error) return 'border-error';
    return 'border-gray-100';
  };

  return (
    <div className={`w-full flex flex-col gap-3 ${wrapperClassName}`}>
      <label className={`flex items-center gap-1 ${labelClassName}`} htmlFor={name}>
        <p className="text-gray-900 text-sm font-medium shrink-0">{label}</p>
        {required && <p className="text-error">*</p>}
      </label>

      <div className="relative">
        <Select
          id={name}
          name={name}
          options={options}
          isMulti
          placeholder={placeholder}
          value={options?.filter(option => (field.value || []).includes(option.value))}
          onChange={val => {
            const selectedIds = (val as Option[]).map(option => option.value);
            setFieldValue(name, selectedIds);
          }}
          classNamePrefix="formik-multi"
          className={`${getBorderClass()} ${className}`}
          styles={{
            control: base => ({
              ...base,
              padding: '6px',
              borderRadius: '0.5rem',
              borderColor: meta.touched && meta.error ? '#f87171' : '#e5e7eb', // red-400 or gray-100
              boxShadow: 'none',
              fontSize: '14px',
              color: '#9ca3af', // gray-400
              '&:hover': {
                borderColor: '#60a5fa', // blue-400
              },
            }),
          }}
        />
        <div className="top-1/2 right-3 absolute -translate-y-1/2 pointer-events-none">
          {/* <PlayIcon className="rotate-90" /> */}
        </div>
      </div>

      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default InputSelectMulti;

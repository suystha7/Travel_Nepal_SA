import React from 'react';
import { ErrorMessage, useField } from 'formik';

interface IInputTime extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  required?: boolean;
}

const InputTime: React.FC<IInputTime> = ({
  name,
  label,
  className,
  labelClassName,
  required,
  ...props
}) => {
  const [field, meta] = useField(name);

  const getBorderClass = () => {
    if (meta.touched && meta.error) return 'border-error';
    return 'border-gray-100';
  };

  return (
    <div className="flex flex-col gap-3 relative">
      <label className={`flex items-center gap-1 ${labelClassName}`} htmlFor={name}>
        <p>{label}</p>
        {required && <p className="text-error">*</p>}
      </label>

      <input
        id={name}
        type="time"
        className={`w-full p-3 typography-regular-extra-small text-gray-700 rounded-md border focus:outline-primary-500 ${getBorderClass()} ${className} [&::-webkit-calendar-picker-indicator]:opacity-0`}
        {...field}
        {...props}
      />

      {/* Custom Icon Placeholder */}
      <div className="absolute right-4 top-[52px] pointer-events-none">⏰</div>

      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default InputTime;

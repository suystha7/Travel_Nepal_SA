import React from 'react';
import { ErrorMessage, useField } from 'formik';

interface IInputText extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  mainClassName?: string;
}

const InputText: React.FC<IInputText> = ({
  name,
  label,
  labelClassName,
  className,
  required,
  wrapperClassName,
  mainClassName,
  ...props
}) => {
  const [field, meta] = useField(name);

  const getBorderClass = () => {
    if (meta.touched && meta.error) {
      return 'border-error';
    }
    return 'border-gray-100';
  };

  return (
    <div className={`w-full ${mainClassName}`}>
      <div className={`flex flex-col gap-3 ${wrapperClassName}`}>
        <label className={`flex items-center gap-1 ${labelClassName}`} htmlFor={name}>
          <p className="text-gray-900 font-medium text-sm shrink-0">{label}</p>
          {required && <p className="text-error">*</p>}
        </label>
        <input
          id={name}
          type="text"
          className={`w-full file:px-4 file:py-1 file:text-gray-600 file:font-sans file:font-normal file:typography-regular-extra-small placeholder:typography-regular-small typography-regular-extra-small  placeholder:text-gray-300 file:text-[0.750rem] file:rounded-[3px] file:border file:mr-2.5 file:border-gray-100 file:bg-[#FBFBFB] p-3 rounded-md focus:outline-primary-500 border-[0.5px] ${className} ${getBorderClass()}`}
          {...field}
          {...props}
        />
      </div>
      <ErrorMessage name={name} component="div" className="mt-3 text-red-500 text-sm" />
    </div>
  );
};

export default InputText;

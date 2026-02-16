import React, { useState } from 'react';
import { ErrorMessage, useField } from 'formik';

interface IInputText extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  wrapperClassName?: string;
}

const InputPassword: React.FC<IInputText> = ({
  name,
  label,
  labelClassName,
  className,
  required,
  wrapperClassName,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [field, meta] = useField(name);

  const getBorderClass = () => {
    if (meta.touched && meta.error) {
      return 'border-error';
    }
    return 'border-gray-100';
  };

  return (
    <div className={`w-full`}>
      <div className={`flex flex-col gap-3 ${wrapperClassName}`}>
        <label className={`flex items-center gap-1 ${labelClassName}`} htmlFor={name}>
          <p className="text-primary-900 typography-regular-small">{label}</p>
          {required && <p className="text-error">*</p>}
        </label>
        <div className="relative w-full">
          <input
            id={name}
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            className={`w-full file:px-4 file:py-1 file:text-gray-600 file:font-sans file:font-normal file:typography-regular-extra-small file:text-[0.750rem] file:rounded-[3px] file:border file:mr-2.5 file:border-gray-100 file:bg-[#FBFBFB] p-3 typography-regular-small  rounded-md focus:outline-primary-500 border-[0.5px] ${className} ${getBorderClass()}`}
            {...field}
            {...props}
          />

          <button
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            type="button"
            className="top-1/2 right-3 absolute -translate-y-1/2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clipPath="url(#clip0_499_14246)">
                <path
                  d="M8.00002 3C4.66669 3 1.82002 5.07333 0.666687 8C1.82002 10.9267 4.66669 13 8.00002 13C11.3334 13 14.18 10.9267 15.3334 8C14.18 5.07333 11.3334 3 8.00002 3ZM8.00002 11.6667C5.47335 11.6667 3.22002 10.2467 2.12002 8C3.22002 5.75333 5.47335 4.33333 8.00002 4.33333C10.5267 4.33333 12.78 5.75333 13.88 8C12.78 10.2467 10.5267 11.6667 8.00002 11.6667ZM8.00002 5C6.34669 5 5.00002 6.34667 5.00002 8C5.00002 9.65333 6.34669 11 8.00002 11C9.65335 11 11 9.65333 11 8C11 6.34667 9.65335 5 8.00002 5ZM8.00002 9.66667C7.08002 9.66667 6.33335 8.92 6.33335 8C6.33335 7.08 7.08002 6.33333 8.00002 6.33333C8.92002 6.33333 9.66669 7.08 9.66669 8C9.66669 8.92 8.92002 9.66667 8.00002 9.66667Z"
                  fill="#2F234F"
                />
              </g>
              <defs>
                <clipPath id="clip0_499_14246">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      <ErrorMessage name={name} component="div" className="mt-3 text-red-500 text-sm" />
    </div>
  );
};

export default InputPassword;

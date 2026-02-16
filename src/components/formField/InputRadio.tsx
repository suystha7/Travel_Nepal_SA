import React from 'react';
import { useField, ErrorMessage } from 'formik';

interface IInputRadio extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label?: string;
  className?: string;
  labelClassName?: string;
  required?: boolean;
}

const InputRadio: React.FC<IInputRadio> = ({
  name,
  value,
  label,
  className,
  labelClassName,
  required,
  ...props
}) => {
  const [field, meta] = useField({ name, type: 'radio', value });

  return (
    <div className="flex flex-col gap-2">
      <label
        className={`flex items-center gap-2 cursor-pointer ${labelClassName}`}
        htmlFor={`${name}-${value}`}
      >
        <input type="radio" id={`${name}-${value}`} className="hidden peer" {...field} {...props} />
        <div
          style={{
            boxShadow: `0px 1px 1px 0px rgba(0, 0, 0, 0.10),0px 0px 0px 1px rgba(70, 79, 96, 0.16),0px 2px 5px 0px rgba(89, 96, 120, 0.10)`,
          }}
          id={name}
          className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-primary-500 peer-checked:border-primary-500"
        >
          {/* Custom Checked Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M4.27499 10.3499L6.63749 12.7124L13.725 5.28735"
              stroke="white"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {label && <span className="typography-regular-extra-small text-gray-500">{label}</span>}
      </label>
      {meta.touched && meta.error && (
        <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
      )}
    </div>
  );
};

export default InputRadio;

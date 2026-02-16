import React from 'react';
import { useField, ErrorMessage } from 'formik';
import { Check } from 'lucide-react';

interface IInputCheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  labelClassName?: string;
  required?: boolean;
}

const InputCheckbox: React.FC<IInputCheckbox> = ({
  name,
  label,
  labelClassName,
  required,
  ...props
}) => {
  const [field, meta] = useField({ name, type: 'checkbox' });

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className={`flex items-center gap-2 cursor-pointer ${labelClassName}`}>
        <input id={name} type="checkbox" className="hidden peer" {...field} {...props} />

        <div
          className={`
            w-5 h-5 rounded border border-gray-300 flex items-center justify-center
            peer-checked:bg-primary-500 peer-checked:border-primary-500
            transition-all
          `}
        >
          <Check className="text-white w-4 h-4 opacity-0 peer-checked:opacity-100" />
        </div>

        {label && (
          <span className="text-sm text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </span>
        )}
      </label>

      {meta.touched && meta.error && (
        <ErrorMessage name={name} component="div" className="text-red-500 text-xs" />
      )}
    </div>
  );
};

export default InputCheckbox;

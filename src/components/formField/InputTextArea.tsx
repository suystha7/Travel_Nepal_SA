import React from 'react';
import { ErrorMessage, useField } from 'formik';

interface IInputTextArea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
}

const InputTextArea: React.FC<IInputTextArea> = ({
  name,
  label,
  labelClassName,
  className,
  required,
  cols = 3,
  ...props
}) => {
  const [field, meta] = useField(name);

  const getBorderClass = () => {
    if (meta.touched && meta.error) return 'border-error';
    return 'border-gray-100';
  };

  return (
    <div className="flex flex-col gap-3">
      <label className={`flex items-center gap-1 ${labelClassName}`} htmlFor={name}>
        <p>{label}</p>
        {required && <p className="text-error">*</p>}
      </label>
      <textarea
        id={name}
        rows={cols}
        className={`w-full p-3 text-xs text-black rounded-md border resize-none focus:outline-primary-500 ${className} ${getBorderClass()}`}
        {...field}
        {...props}
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default InputTextArea;

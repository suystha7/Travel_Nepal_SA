import { ErrorMessage, useField } from 'formik';
import React, { useEffect, useState } from 'react';

interface ISwitch extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  mainClassName?: string;
  wrapperClassName?: string;
}

const InputSwitch: React.FC<ISwitch> = ({ label, name, mainClassName, wrapperClassName }) => {
  const [field, , helpers] = useField(name);
  const [value, setValue] = useState<boolean>(field.value);
  const toogleSwitch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (field.value) {
      helpers.setValue(false);
      setValue(false);
    } else {
      helpers.setValue(true);
      setValue(true);
    }
  };

  useEffect(() => {
    setValue(!!field.value);
  }, [field.value]);

  return (
    <div className={`${mainClassName} w-max shrink-0`}>
      <div className={`flex items-center gap-2.5 ${wrapperClassName}`}>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <button
          onClick={toogleSwitch}
          className={`w-8 h-5  ${value ? 'bg-primary-500' : 'bg-[#C6C6C6]'} rounded-3xl flex items-center ${value ? 'justify-end' : ''} px-0.5 transition-all ease-in-out duration-300 cursor-pointer`}
        >
          <span className="size-4 rounded-full bg-white " />
        </button>
      </div>
      <ErrorMessage name={name} component="div" className="mt-3 text-red-500 text-sm" />
    </div>
  );
};

export default InputSwitch;

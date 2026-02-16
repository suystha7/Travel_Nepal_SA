import { useFormikContext, getIn, type FormikValues } from 'formik';
import { useEffect, useState } from 'react';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface Props<T extends FormikValues> {
  name: keyof T & string;
  placeholder?: string;
  defaultValue?: string[];
  required?: boolean;
  label: string;
}

export default function CustomMonthSelect<T extends FormikValues>({
  name,
  defaultValue = [],
  required,
  label,
}: Props<T>) {
  const { setFieldValue, errors, touched } = useFormikContext<T>();
  const [selected, setSelected] = useState<string[]>(defaultValue);

  useEffect(() => {
    if (defaultValue?.length) {
      setSelected(defaultValue);
      setFieldValue(name, defaultValue);
    }
  }, [defaultValue, name, setFieldValue]);

  const toggleMonth = (month: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();

    const updated = selected.includes(month)
      ? selected.filter(m => m !== month)
      : [...selected, month];

    setSelected(updated);
    setFieldValue(name, updated);
  };

  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);

  return (
    <div className="flex flex-col gap-2 w-full" onClick={e => e.stopPropagation()}>
      <label className="flex items-center gap-1" htmlFor={name}>
        <p className="text-gray-900 font-medium text-sm">{label}</p>
        {required && <p className="text-error">*</p>}
      </label>

      <div className="flex flex-wrap gap-2 mt-2">
        {MONTHS.map(month => {
          const isActive = selected.includes(month);

          return (
            <button
              key={month}
              type="button"
              onClick={e => toggleMonth(month, e)}
              className={`py-2 px-2 text-xs rounded-md border transition w-20
                ${
                  isActive
                    ? 'bg-primary-500 text-white cursor-pointer'
                    : 'dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-[#2c3550] cursor-pointer'
                }
              `}
            >
              {month}
            </button>
          );
        })}
      </div>

      {isTouched && error && <span className="text-red-500 text-sm">{error.toString()}</span>}
    </div>
  );
}

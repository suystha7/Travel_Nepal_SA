import { Checkbox } from '@/components/ui/checkbox';
import { useField } from 'formik';

interface ICheckboxFieldProps {
  name: string;
  label: string;
}

const CheckBox: React.FC<ICheckboxFieldProps> = ({ name, label }) => {
  const [field, meta, helpers] = useField({ name, type: 'checkbox' });

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={name}
        checked={field.value}
        onCheckedChange={checked => helpers.setValue(!!checked)}
      />
      <label htmlFor={name} className="font-medium text-sm">
        {label}
      </label>
      {meta.touched && meta.error && <p className="text-red-500 text-xs">{meta.error}</p>}
    </div>
  );
};

export default CheckBox;

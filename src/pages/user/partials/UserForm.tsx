import InputText from '@/components/formField/InputText';
import React, { useState } from 'react';
import InputSwitch from '@/components/formField/InputSwitch';
// import InputFileWithPreview from '@/components/formField/InputFile';
import { Eye, EyeOff } from 'lucide-react';
import ReactSelect from '@/components/formField/ReactSelect';
import InputFileWithPreview from '@/components/formField/InputFile';

interface UserFormProps {
  isUpdate?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ isUpdate = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 bg-white container-shadow rounded-md px-2">
        <InputText required label="Full Name" name="full_name" placeholder="Enter full name.." />
        <InputText
          label="Email"
          name="email"
          placeholder="Enter email.."
          type="email"
          disabled={isUpdate}
        />

        {!isUpdate && (
          <div className="relative">
            <InputText
              label="Password"
              name="password"
              placeholder="Enter password.."
              type={showPassword ? 'text' : 'password'}
            />
            <button
              type="button"
              className="absolute right-3 top-11 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        )}

        <InputText required label="Phone" name="phone_no" placeholder="Enter phone no.." />

        <ReactSelect
          required
          label="Role"
          name="role"
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'Staff', value: 'staff' },
          ]}
        />

        <InputFileWithPreview label="Avatar" name="avatar" />

        {isUpdate && (
          <div className="mt-12 pl-2">
            <InputSwitch label="Active" name="is_active" defaultChecked />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;

import InputText from '@/components/formField/InputText';
import React, { useState } from 'react';
import InputSwitch from '@/components/formField/InputSwitch';
// import InputFileWithPreview from '@/components/formField/InputFile';
import { Eye, EyeOff } from 'lucide-react';

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
        {/* <InputFileWithPreview name="avatar" label="Avatar" required /> */}
      </div>

      <div className="flex gap-5 my-4 px-2">
        <InputSwitch required label="Active" name="is_active" defaultChecked={true} />
        <InputSwitch required label="Admin" name="is_admin" />
        <InputSwitch required label="Staff" name="is_staff" />
      </div>
    </div>
  );
};

export default UserForm;

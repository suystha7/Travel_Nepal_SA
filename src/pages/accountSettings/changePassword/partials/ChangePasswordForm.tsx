import React, { useState } from 'react';
import { Form, useFormikContext } from 'formik';
import InputText from '@/components/formField/InputText';
import { Eye, EyeOff } from 'lucide-react';
import type { IChangePasswordListItem } from '../interface/IChangePassword';

const ChangePasswordForm: React.FC = () => {
  const { handleSubmit } = useFormikContext<IChangePasswordListItem>();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-white container-shadow mt-4 rounded-md px-6 py-5"
    >
      <div className="grid grid-cols-1 gap-x-6 gap-y-7">
        <div className="relative">
          <InputText
            label="Old Password"
            name="oldPassword"
            placeholder="Enter old password"
            type={showOld ? 'text' : 'password'}
            required
          />
          <button
            type="button"
            onClick={() => setShowOld(prev => !prev)}
            className="absolute right-3 top-[48px] text-gray-400"
          >
            {showOld ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="relative">
          <InputText
            label="New Password"
            name="newPassword"
            placeholder="Enter new password"
            type={showNew ? 'text' : 'password'}
            required
          />
          <button
            type="button"
            onClick={() => setShowNew(prev => !prev)}
            className="absolute right-3 top-[48px] text-gray-400"
          >
            {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="relative">
          <InputText
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Enter confirm password"
            type={showConfirm ? 'text' : 'password'}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(prev => !prev)}
            className="absolute right-3 top-[48px] text-gray-400"
          >
            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
        >
          Change password
        </button>
      </div>
    </Form>
  );
};

export default ChangePasswordForm;

import InputText from '@/components/formField/InputText';
import ReactSelect from '@/components/formField/ReactSelect';
import React from 'react';

const SocialMediaForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 bg-white container-shadow rounded-md px-2">
        <InputText
          required
          label="Platform Name"
          name="platform"
          placeholder="Enter platform name..."
        />
        <InputText required label="URL" name="url" placeholder="Enter URL..." />

        <ReactSelect
          required
          label="Status"
          name="status"
          placeholder="Select status"
          options={[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ]}
        />
      </div>
    </div>
  );
};

export default SocialMediaForm;

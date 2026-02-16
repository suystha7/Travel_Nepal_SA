import InputText from '@/components/formField/InputText';
import ReactSelect from '@/components/formField/ReactSelect';
import TextEditor from '@/components/TextEditor';
import React from 'react';

const PolicyForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-white container-shadow rounded-md px-2">
        <ReactSelect
          required
          label="Policy Type"
          name="policy_type"
          placeholder="Select Policy Type"
          options={[
            { label: 'Privacy Policy', value: 'privacy' },
            { label: 'Terms & Conditions', value: 'termsandconditions' },
            { label: 'Return Policy', value: 'refundpolicy' },
          ]}
        />
        <InputText required label="Policy Title" name="title" placeholder="Enter Policy Title" />
      </div>

      <div className="px-2">
        <TextEditor required label="Policy Description" name="description" />
      </div>
    </div>
  );
};

export default PolicyForm;

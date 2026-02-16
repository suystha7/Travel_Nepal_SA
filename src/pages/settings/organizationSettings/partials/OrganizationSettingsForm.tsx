import InputFileWithPreview from '@/components/formField/InputFile';
import InputText from '@/components/formField/InputText';
import { Form, useFormikContext } from 'formik';
import React from 'react';
import TextEditor from '@/components/TextEditor';
import type { organizationSettingsFormField } from '../schema/OrganizationSettingsSchema';

interface OrganizationSettingsFormProps {
  isUpdate: boolean;
}

const OrganizationSettingsForm: React.FC<OrganizationSettingsFormProps> = ({ isUpdate }) => {
  const { handleSubmit } = useFormikContext<organizationSettingsFormField>();

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-white container-shadow mt-4 rounded-md px-6 py-5 overflow-auto"
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-7">
        <InputFileWithPreview required label="Logo" name="logo" />

        <InputText required label="Company Name" name="name" placeholder="Enter Company Name" />

        <InputText
          required
          label="Company Address"
          name="address"
          placeholder="Enter Company Address"
        />

        <InputText required label="Phone Number" name="phone" placeholder="Enter Phone Number" />

        <InputText required label="Email" name="email" placeholder="Enter Email" />
        <InputText required label="Location URL" name="google_map" />
      </div>

      <TextEditor required label="Disclaimer" name="disclaimer" />

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
        >
          {isUpdate ? 'Update' : 'Add'}
        </button>
      </div>
    </Form>
  );
};

export default OrganizationSettingsForm;

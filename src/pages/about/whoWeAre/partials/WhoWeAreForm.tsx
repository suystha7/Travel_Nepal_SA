import InputFileWithPreview from '@/components/formField/InputFile';
import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';
import { Form, useFormikContext } from 'formik';
import React from 'react';

const WhoWeAreForm: React.FC<{ isUpdate: boolean }> = ({ isUpdate }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-white container-shadow mt-4 rounded-md px-6 py-5 overflow-auto"
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-7 ">
        <InputText label="Title" name="title" placeholder="Enter title.." required />

        <InputFileWithPreview label="Images" name="image" multiple />
      </div>

      <TextEditor label="Description" name="description" required />

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

export default WhoWeAreForm;

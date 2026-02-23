import React from 'react';
import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';
import InputFileWithPreview from '@/components/formField/InputFile';

const TestimonialForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-white container-shadow rounded-md px-2">
        <InputText required label="User" name="user_id" placeholder="User name..." readOnly />

        <InputText
          required
          label="Package"
          name="package_id"
          placeholder="Package name..."
          readOnly
        />

        <InputText required label="Rating" name="rating" placeholder="Enter rating..." readOnly />

        <InputFileWithPreview label="User Image" name="image" required readonly />
      </div>

      <div className="px-2">
        <TextEditor label="Comment" name="comment" required readonly />
      </div>
    </div>
  );
};

export default TestimonialForm;

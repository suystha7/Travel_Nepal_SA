import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';
import InputFileWithPreview from '@/components/formField/InputFile';
import React from 'react';

const TestimonialForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-white container-shadow rounded-md px-2">
        <InputText required label="Name" name="name" placeholder="Enter name..." />

        <InputText required label="Rating" name="rating" placeholder="Enter rating..." />

        <InputFileWithPreview label="Image" name="image" required />
      </div>

      <div className="px-2">
        <TextEditor label="Message" name="message" required />
      </div>
    </div>
  );
};

export default TestimonialForm;

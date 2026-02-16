import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';
import React from 'react';
import InputFileWithPreview from '@/components/formField/InputFile';
import ReactSelect from '@/components/formField/ReactSelect';

const BreadcrumbForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-white container-shadow  rounded-md px-2">
        <ReactSelect
          required
          label="Type"
          name="type"
          placeholder="Select type"
          options={[
            {
              label: 'Home',
              value: 'home',
            },
            {
              label: 'About Us',
              value: 'about-us',
            },
            {
              label: 'Package',
              value: 'package',
            },
            {
              label: 'Contact Us',
              value: 'contact-us',
            },
            {
              label: 'Blog',
              value: 'blog',
            },
          ]}
        />

        <InputText required label="Title" name="title" placeholder="Enter title.." />

        <InputText required label="Subtitle" name="subtitle" placeholder="Enter subtitle.." />

        <InputFileWithPreview required label="Image" name="image" accept="image/*" />
        <InputFileWithPreview label="Video" name="video" accept="video/*" />
      </div>

      <div className="px-2">
        <TextEditor label="Description" name="description" required />
      </div>
    </div>
  );
};

export default BreadcrumbForm;

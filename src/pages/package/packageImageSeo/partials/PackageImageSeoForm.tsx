import InputFileWithPreview from '@/components/formField/InputFile';
import InputText from '@/components/formField/InputText';
import ReactSelect from '@/components/formField/ReactSelect';
import type { IOption } from '@/types/common';
import React from 'react';

interface PackageImageSeoFormProps {
  packageOptions: IOption[];
}

const PackageImageSeoForm: React.FC<PackageImageSeoFormProps> = ({ packageOptions }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 bg-white container-shadow rounded-md px-2">
        <ReactSelect
          required
          label="Package Name"
          name="package_id"
          options={packageOptions}
          placeholder="Select package name"
        />

        <InputText required label="Image Title" name="title" placeholder="Enter image title" />
        <InputText
          required
          label="Image Caption"
          name="caption"
          placeholder="Enter image caption"
        />
        <InputText required label="Image Alt Text" name="alt" placeholder="Enter image alt text" />

        <InputFileWithPreview label="Blog Image Seo" name="image" required />
      </div>
    </div>
  );
};

export default PackageImageSeoForm;

import React from 'react';
import InputFileWithPreview from '@/components/formField/InputFile';
import InputText from '@/components/formField/InputText';
import ReactSelect from '@/components/formField/ReactSelect';
import type { IOption } from '@/types/common';

interface IProps {
  packageOptions: IOption[];
}

const PackageSeoForm: React.FC<IProps> = ({ packageOptions = [] }) => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-7 px-1">
      <ReactSelect
        required
        label="Select Package"
        name="package_id"
        placeholder="Enter related page/entity"
        options={packageOptions}
      />

      <InputText required label="Meta Title" name="meta_title" placeholder="Enter Meta Title" />
      <InputText
        required
        label="Meta Description"
        name="meta_description"
        placeholder="Enter Meta Description"
      />
      <InputText required label="OG Title" name="og_title" placeholder="Enter Open Graph Title" />
      <InputText
        required
        label="OG Description"
        name="og_description"
        placeholder="Enter Open Graph Description"
      />
      <InputFileWithPreview label="OG Image" name="og_image" />

      <InputText
        required
        label="Canonical URL"
        name="canonical_url"
        placeholder="Enter Canonical URL"
      />

      <InputFileWithPreview label="Image" name="image_url" />

      <InputText required label="Image Title" name="image_title" placeholder="Enter Image Title" />

      <InputText
        required
        label="Image Caption"
        name="image_caption"
        placeholder="Enter Image Caption"
      />

      <InputText
        required
        label="Image Alt Text"
        name="image_alt"
        placeholder="Enter Image Alt Text"
      />
    </div>
  );
};

export default PackageSeoForm;

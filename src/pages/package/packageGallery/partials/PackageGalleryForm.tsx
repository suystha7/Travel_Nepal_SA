"use client";

import React from 'react';
import { useFormikContext } from 'formik';
import InputFileWithPreview from '@/components/formField/InputFile';
import ReactSelect from '@/components/formField/ReactSelect';
import type { IOption } from '@/types/common';

interface GalleryFormProps {
  packageOptions: IOption[];
}

interface FormValues {
  package_id: string | undefined;
  image: string;
}

const PackageGalleryForm: React.FC<GalleryFormProps> = ({ packageOptions }) => {
  useFormikContext<FormValues>();

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 bg-white container-shadow rounded-md">
        <ReactSelect
          required
          label="Package Name"
          name="package_id"
          options={packageOptions}
          placeholder="Select package"
        />

        <InputFileWithPreview 
          label="Images" 
          name="images" 
          required 
          multiple 
        />
      </div>
    </div>
  );
};

export default PackageGalleryForm;
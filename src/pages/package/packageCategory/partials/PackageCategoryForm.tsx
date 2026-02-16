import InputText from '@/components/formField/InputText';
import React from 'react';
import InputFileWithPreview from '@/components/formField/InputFile';
import ReactSelect from '@/components/formField/ReactSelect';
import type { IOption } from '@/types/common';

interface PackageCategoryFormProps {
  packageTypeOptions: IOption[];
}

const PackageCategoryForm: React.FC<PackageCategoryFormProps> = ({ packageTypeOptions }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-white container-shadow rounded-md px-2">
        <ReactSelect
          label="Package Type"
          name="package_type_id"
          placeholder="Select Package Type"
          required
          options={packageTypeOptions}
        />
        <InputText
          label="Package Category"
          name="name"
          placeholder="Enter package category..."
          required
        />
        <InputFileWithPreview label="Image" name="image" required />
      </div>
    </div>
  );
};

export default PackageCategoryForm;

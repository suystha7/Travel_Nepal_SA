import InputText from '@/components/formField/InputText';
import React from 'react';
import InputFileWithPreview from '@/components/formField/InputFile';

const PackageTypeForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-white container-shadow rounded-md px-2">
        <InputText required label="Package Type" name="name" placeholder="Enter package type..." />
        <InputFileWithPreview label="Image" name="image" required />
      </div>
    </div>
  );
};

export default PackageTypeForm;

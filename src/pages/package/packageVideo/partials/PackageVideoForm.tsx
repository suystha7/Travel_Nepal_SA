import InputText from '@/components/formField/InputText';
import React from 'react';
import ReactSelect from '@/components/formField/ReactSelect';
import InputFileWithPreview from '@/components/formField/InputFile';
import type { IOption } from '@/types/common';

interface PackageVideoFormProps {
  packageOptions: IOption[];
}

const PackageVideoForm: React.FC<PackageVideoFormProps> = ({ packageOptions }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-white container-shadow rounded-md px-2">
        <ReactSelect
          required
          label="Package Name"
          name="package_id"
          options={packageOptions}
          placeholder="Select package"
        />
        <InputFileWithPreview label="Video" name="video" accept="video/*" />
      </div>
      <InputText label="Video Url" name="video_url" placeholder="Enter video url..." />
    </div>
  );
};

export default PackageVideoForm;

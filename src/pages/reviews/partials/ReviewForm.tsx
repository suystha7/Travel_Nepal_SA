import React from 'react';
import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';

const ReviewForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-white container-shadow rounded-md px-2">
        <InputText label="User" name="user.full_name" placeholder="User name..." readOnly />

        <InputText label="Package" name="package.name" placeholder="Package name..." readOnly />

        <InputText label="Rating" name="rating" placeholder="Enter rating..." readOnly />
      </div>

      <div className="px-2">
        <TextEditor label="Comment" name="comment" readonly />
      </div>
    </div>
  );
};

export default ReviewForm;

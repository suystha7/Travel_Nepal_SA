import InputFileWithPreview from '@/components/formField/InputFile';
import ReactSelect from '@/components/formField/ReactSelect';
import type { IOption } from '@/types/common';
import React from 'react';

interface BlogImageFormProps {
  blogOptions: IOption[];
}

const BlogImageForm: React.FC<BlogImageFormProps> = ({ blogOptions }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-x-6 gap-y-3 bg-white container-shadow rounded-md px-2">
        <ReactSelect
          required
          label="Blog Name"
          name="blog_id"
          options={blogOptions}
          placeholder="Select blog name"
        />

        <InputFileWithPreview label="Blog Image" name="image" required />
      </div>
    </div>
  );
};

export default BlogImageForm;

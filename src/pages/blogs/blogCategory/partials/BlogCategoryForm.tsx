import InputText from '@/components/formField/InputText';
import React from 'react';

const BlogCategoryForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 bg-white container-shadow rounded-md px-2">
        <InputText
          required
          label="Blog Category"
          name="name"
          placeholder="Enter blog category..."
        />
      </div>
    </div>
  );
};

export default BlogCategoryForm;

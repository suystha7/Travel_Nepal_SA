import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';
import React from 'react';
import InputSwitch from '@/components/formField/InputSwitch';
import ReactSelect from '@/components/formField/ReactSelect';
import type { IOption } from '@/types/common';
import InputFileWithPreview from '@/components/formField/InputFile';

interface BlogFormProps {
  authorOptions: IOption[];
  blogCategoryOptions: IOption[];
}

const BlogForm: React.FC<BlogFormProps> = ({ authorOptions, blogCategoryOptions }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 bg-white container-shadow rounded-md px-2">
        <InputText required label="Title" name="title" placeholder="Enter title..." />
        <ReactSelect
          required
          label="Blog Category"
          name="category_id"
          options={blogCategoryOptions}
          placeholder="Select blog category"
        />
        <ReactSelect
          required
          label="Author Name"
          name="author_id"
          options={authorOptions}
          placeholder="Select author name"
        />

        <InputFileWithPreview label="Image" name="image" accept="image/*" />

        <div className="">
          <InputSwitch name="is_popular" label="Is Popular ?" />
        </div>
      </div>

      <div className="px-2 mt-2">
        <TextEditor label="Description" name="description" required />
      </div>
    </div>
  );
};

export default BlogForm;

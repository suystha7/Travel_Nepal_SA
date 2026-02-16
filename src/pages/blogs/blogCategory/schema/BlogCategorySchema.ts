import * as Yup from 'yup';

export const BlogCategorySchema = Yup.object().shape({
  name: Yup.string().required('Blog Name is required'),
  // category_id: Yup.string().required('Category is required'),
});

export type blogCategoryFormField = Yup.InferType<typeof BlogCategorySchema>;

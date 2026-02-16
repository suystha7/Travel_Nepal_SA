import * as Yup from 'yup';

export const BlogSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  author_id: Yup.string().required('Author is required'),
  category_id: Yup.string().required('Category is required'),
  is_popular: Yup.boolean().required('Popularity is required'),
  image: Yup.mixed().optional(),
});

export type blogFormField = Yup.InferType<typeof BlogSchema>;

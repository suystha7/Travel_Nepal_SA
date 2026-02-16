import * as Yup from 'yup';

export const BlogImageSchema = Yup.object().shape({
  blog_id: Yup.string().required('Blog Name is required'),
  image: Yup.mixed().required('Image is required'),
});

export type blogImageFormField = Yup.InferType<typeof BlogImageSchema>;

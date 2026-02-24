import * as Yup from 'yup';

export const BlogImageSeoSchema = Yup.object().shape({
  blog_id: Yup.string().required('Blog Name is required'),
  image: Yup.mixed().required('Image is required'),
  title: Yup.string(),
  caption: Yup.string(),
  alt: Yup.string(),
});

export type blogImageSeoFormField = Yup.InferType<typeof BlogImageSeoSchema>;

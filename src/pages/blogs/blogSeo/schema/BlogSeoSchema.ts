import * as Yup from 'yup';

export const BlogSeoSchema = Yup.object().shape({
  meta_title: Yup.string().required('Meta title is required'),
  meta_description: Yup.string().required('Meta description is required'),
  meta_Keywords: Yup.array().optional(),
  og_title: Yup.string().required('OG title is required'),
  og_description: Yup.string().required('OG description is required'),
  og_image: Yup.mixed<File | string>().nullable(),
  og_url: Yup.string().required('OG url is required'),
  canonical_url: Yup.string().required('Canonical url is required'),
  robots: Yup.string(),
  blog_id: Yup.string().required('Blog is required'),
  image_url: Yup.string().required('Image URL is required') ,
  image_title: Yup.string().required('Image title is required'),
  image_caption: Yup.string().required('Image caption is required'),
  image_alt: Yup.string().required('Image alt is required'),
});

export type blogSeoFormField = Yup.InferType<typeof BlogSeoSchema>;

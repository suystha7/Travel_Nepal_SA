import * as Yup from 'yup';

export const SEOSchema = Yup.object().shape({
  meta_title: Yup.string().required('Meta title is required'),
  meta_description: Yup.string().required('Meta description is required'),
  meta_Keywords: Yup.array().optional(),
  og_title: Yup.string().required('OG title is required'),
  og_description: Yup.string().required('OG description is required'),
  og_image: Yup.mixed<File | string>().nullable(),
  og_url: Yup.string().required('OG url is required'),
  canonical_url: Yup.string().required('Canonical url is required'),
  robots: Yup.string(),
  seo_for: Yup.string().required('Seo for is required'),
});

export type seoFormField = Yup.InferType<typeof SEOSchema>;

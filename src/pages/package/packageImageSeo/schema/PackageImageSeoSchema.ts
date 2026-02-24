import * as Yup from 'yup';

export const PackageImageSeoSchema = Yup.object().shape({
  package_id: Yup.string().required('Package Name is required'),
  image: Yup.mixed().required('Image is required'),
  title: Yup.string(),
  caption: Yup.string(),
  alt: Yup.string(),
});

export type packageImageSeoFormField = Yup.InferType<typeof PackageImageSeoSchema>;

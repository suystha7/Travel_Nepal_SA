import * as Yup from 'yup';

export const PackageCategorySchema = Yup.object().shape({
  name: Yup.string().required('Package name is required'),
  image: Yup.mixed().required('Image is required'),
  package_type_id: Yup.string().required('Package type is required'),
});

export type packageCategoryFormField = Yup.InferType<typeof PackageCategorySchema>;

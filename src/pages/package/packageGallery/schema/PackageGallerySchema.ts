import * as Yup from 'yup';

export const PackageGallerySchema = Yup.object().shape({
  url: Yup.array().of(Yup.string().required('Images are required')),
  package_id: Yup.string().when('type', {
    is: 'Package',
    then: schema => schema.required('Package Name is required'),
  }),
});

export type packageGalleryFormField = Yup.InferType<typeof PackageGallerySchema>;

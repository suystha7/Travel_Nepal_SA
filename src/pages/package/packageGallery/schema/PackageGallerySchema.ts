import * as Yup from 'yup';

export const PackageGallerySchema = Yup.object().shape({
  images: Yup.mixed().required('Image is required'),
  package_id: Yup.string().when('type', {
    is: 'Package',
    then: schema => schema.required('Package Name is required'),
  }),
});

export type packageGalleryFormField = Yup.InferType<typeof PackageGallerySchema>;

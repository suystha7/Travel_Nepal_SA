import * as Yup from 'yup';

export const PackageGallerySchema = Yup.object().shape({
  package_id: Yup.string().required('Package Name is required'),
  images: Yup.array()
    .of(
      Yup.lazy(value => {
        if (value instanceof File) {
          return Yup.mixed();
        }
        return Yup.object().shape({
          id: Yup.string().required('Required'),
          url: Yup.string().url('Invalid URL').required('Required'),
        });
      })
    )
    .min(1, 'At least one image is required')
    .required('Image is required'),
});

export type packageGalleryFormField = Yup.InferType<typeof PackageGallerySchema>;

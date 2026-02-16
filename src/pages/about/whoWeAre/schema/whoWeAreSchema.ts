import * as Yup from 'yup';

export const WhoWeAreSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  images: Yup.array().of(Yup.mixed().required('Images are required')),
});

export type whoWeAreFormField = Yup.InferType<typeof WhoWeAreSchema>;

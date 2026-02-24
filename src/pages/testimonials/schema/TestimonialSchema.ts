import * as Yup from 'yup';

export const TestimonialSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  message: Yup.string().required('Message is required'),
  rating: Yup.string()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot be more than 5')
    .required('Rating is required'),
  image: Yup.mixed<File | string>().nullable(),
});

export type testimonialFormField = Yup.InferType<typeof TestimonialSchema>;

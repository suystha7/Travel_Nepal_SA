import * as Yup from 'yup';

export const BreadcrumbSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  subtitle: Yup.string()
    .required('Subtitle is required')
    .min(5, 'Subtitle must be at least 5 characters'),
  type: Yup.string().required('Type is required'),
  image: Yup.mixed().optional(),
  video: Yup.mixed().notRequired(),
});

export type breadcrumbFormField = Yup.InferType<typeof BreadcrumbSchema>;

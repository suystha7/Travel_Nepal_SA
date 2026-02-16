import * as Yup from 'yup';

export const AboutUsSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').min(3),
  sub_title: Yup.string().required('Subtitle is required').min(5),
  description: Yup.string().required('Description is required').min(10),
});

export type aboutUsFormField = Yup.InferType<typeof AboutUsSchema>;

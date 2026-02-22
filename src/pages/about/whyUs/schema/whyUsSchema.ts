import * as Yup from 'yup';

export const WhyUsSchema = Yup.object().shape({
  heading: Yup.string().required('Title is required'),
  sub_heading: Yup.string()
    .required('Description is required'),
  listItems: Yup.array(),
});

export type whyUsFormField = Yup.InferType<typeof WhyUsSchema>;

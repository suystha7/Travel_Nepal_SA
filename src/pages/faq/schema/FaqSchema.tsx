import * as Yup from 'yup';

export const FAQSchema = Yup.object().shape({
  question: Yup.string().required('Question is required'),
  answer: Yup.string().required('Answer is required'),
});
export type faqFormField = Yup.InferType<typeof FAQSchema>;

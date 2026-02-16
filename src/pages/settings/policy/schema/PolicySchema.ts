import * as Yup from 'yup';

export const PolicySchema = Yup.object().shape({
  policy_type: Yup.string().required('Policy Type is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});

export type policyFormField = Yup.InferType<typeof PolicySchema>;

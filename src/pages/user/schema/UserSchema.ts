import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
  full_name: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  email: Yup.string().required('Email is required').email('Enter a valid email address'),
  password: Yup.string(),
  avatar: Yup.string().required('Avatar is required'),
  phone_no: Yup.string().required('Phone no is required'),
  role: Yup.string().required('Role is required'),
});

export type userFormField = Yup.InferType<typeof UserSchema>;

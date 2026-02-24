import * as Yup from 'yup'

export const UserSchema = Yup.object().shape({
  full_name: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters'),

  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email address'),

  password: Yup.string().min(6, 'Password must be at least 6 characters'),

  avatar: Yup.string().required('Avatar is required'),

  phone_no: Yup.string()
    .required('Phone no is required')
    .matches(/^[0-9+\-\s()]+$/, 'Enter a valid phone number'),

  role: Yup.string().required('Role is required'),

  is_active: Yup.boolean()
})

export type userFormField = Yup.InferType<typeof UserSchema>  
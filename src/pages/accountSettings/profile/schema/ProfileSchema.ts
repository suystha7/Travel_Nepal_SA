import * as Yup from 'yup';

export const ProfileSchema = Yup.object().shape({
  first_name: Yup.string(),
  last_name: Yup.string(),
  full_name: Yup.string(),
  email: Yup.string(),
  phone_no: Yup.string(),
  // phone_no: Yup.string().matches(/^\d*$/, 'Phone number must contain only digits'),
  // .max(10, 'Phone number cannot exceed 10 characters'),

  avatar: Yup.mixed(),
});

export type profileFormField = Yup.InferType<typeof ProfileSchema>;

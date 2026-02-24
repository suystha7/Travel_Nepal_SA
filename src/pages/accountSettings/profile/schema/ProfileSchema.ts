import * as Yup from 'yup';

export const ProfileSchema = Yup.object().shape({
  full_name: Yup.string().required("Full Name is required"),
  email: Yup.string().required("Email is required"),
  phone_no: Yup.string().required("Phone No is required"),
  avatar: Yup.mixed(),
});

export type profileFormField = Yup.InferType<typeof ProfileSchema>;

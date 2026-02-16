import * as Yup from 'yup';

export const OrganizationSettingsSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string().email('Email must be a valid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
  google_map: Yup.string().required('Google Map must be a valid URL'),
  disclaimer: Yup.string().required('Disclamier is required'),
  logo: Yup.mixed().required('Logo is required'),
});

export type organizationSettingsFormField = Yup.InferType<typeof OrganizationSettingsSchema>;

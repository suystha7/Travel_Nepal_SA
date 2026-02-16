import * as Yup from 'yup';

export const SocialMediaSettingsSchema = Yup.object().shape({
  platform: Yup.string().required('Platform is required'),
  url: Yup.string().url('URL must be a valid URL').required('URL is required'),
  status: Yup.string().required('Status is required'),
});

export type socialMediaSettingsFormField = Yup.InferType<typeof SocialMediaSettingsSchema>;

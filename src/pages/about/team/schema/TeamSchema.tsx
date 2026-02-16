import * as Yup from 'yup';
export const TeamSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  bio: Yup.string().required('Bio is required').min(10, 'Bio must be at least 10 characters'),
  role: Yup.string().required('Role is required').min(5, 'Role must be at least 5 characters'),
  photo: Yup.mixed().required('Photo is required'),
});

export type teamFormField = Yup.InferType<typeof TeamSchema>;

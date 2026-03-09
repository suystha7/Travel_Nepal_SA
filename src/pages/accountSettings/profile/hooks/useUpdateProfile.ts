import { useUpdateDataMutation } from '@/api/api';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { ProfileSchema, type profileFormField } from '../schema/ProfileSchema';
import { useGetProfileDetails } from './useGetProfileDetails';
import { Endpoints } from '@/api/endpoints';

export const useUpdateProfile = (userId: string) => {
  const [updateProfile] = useUpdateDataMutation();  
  const { data } = useGetProfileDetails({ id: userId });

  const initialValues: profileFormField = {
    full_name: data?.data?.full_name || '',
    email: data?.data?.email || '',
    phone_no: data?.data?.phone_no || '',
    avatar: data?.data?.avatar || '',
    role: data?.data?.role || ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ProfileSchema,
    enableReinitialize: true,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('full_name', values.full_name);
      formData.append('email', values.email);
      formData.append('phone_no', values.phone_no);

      if (values.avatar instanceof File || values.avatar instanceof Blob) {
        formData.append('avatar', values.avatar);
      }

      const response = (await updateProfile({
        url: Endpoints.auth.profile.update.replace(':id', userId),
        data: formData,
        invalidateTag: [apiTags.auth.profile.list, apiTags.auth.profile.details],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
        formik.resetForm();
      }

      if (response?.error?.data?.message) {
        showErrorMessage(response.error.data.message);
      }

      if (response?.error?.data?.errors) {
        handleErrors(response, formik.setErrors);
      }
    },

  });
  
  return { formik };
};

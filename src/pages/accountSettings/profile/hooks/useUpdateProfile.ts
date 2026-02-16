import { useUpdatePutDataMutation } from '@/api/api';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { ProfileSchema, type profileFormField } from '../schema/ProfileSchema';
import { useGetProfileDetails } from './useGetProfileDetails';
import { Endpoints } from '@/api/endpoints';

export const useUpdateProfile = (updateId: string) => {
  const [updateProfile] = useUpdatePutDataMutation();
  const { data } = useGetProfileDetails({ id: updateId });

  const initialValues: profileFormField = {
    full_name: data?.data?.full_name || '',
    first_name: data?.data?.first_name || '',
    last_name: data?.data?.last_name || '',
    email: data?.data?.email || '',
    phone_no: data?.data?.phone_no || '',
    avatar: data?.data?.avatar || '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ProfileSchema,
    enableReinitialize: true,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('full_name', String(values.full_name));
      formData.append('phone_no', String(values.phone_no));

      if (values.avatar instanceof File || values.avatar instanceof Blob) {
        formData.append('avatar', values.avatar);
      }

      const response = (await updateProfile({
        url: Endpoints.auth.profile.update,
        data: formData,
        invalidateTag: [apiTags.auth.profile.list],
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

import { usePostDataMutation } from '@/api/api';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { ChangePasswordSchema, type changePasswordFormField } from '../schema/ChangePasswordSchema';
import { Endpoints } from '@/api/endpoints';

export const useCreateChangePassword = () => {
  const [createChangePassword] = usePostDataMutation();

  const initialValues: changePasswordFormField = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ChangePasswordSchema,
    enableReinitialize: true,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('oldPassword', values.oldPassword);
      formData.append('newPassword', values.newPassword);
      formData.append('confirmPassword', values.confirmPassword);

      const response = (await createChangePassword({
        url: Endpoints.auth.changePassword,
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

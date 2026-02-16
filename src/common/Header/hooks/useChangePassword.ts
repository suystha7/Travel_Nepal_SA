import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { IChangePassword } from '../interface/IAuth';
import { usePostDataMutation } from '@/api/api';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';

export const useChangePassword = () => {
  const [changePassword] = usePostDataMutation();
  const initialValues: IChangePassword = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Current password is required'),

    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters')
      .notOneOf([Yup.ref('oldPassword')], 'New password cannot be the same as current password'),

    confirmPassword: Yup.string()
      .required('Please confirm your new password')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  const onSubmit = async (
    values: {
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    },
    { resetForm }: { resetForm: () => void }
  ) => {
    const response = await changePassword({
      url: Endpoints.auth.changePassword,
      data: values,
    });

    if ('error' in response && response.error) {
      handleErrors(response as ApiResponse, errors => {
        if (errors.general) {
          showErrorMessage(errors.general);
        } else {
          Object.entries(errors).forEach(([field, msg]) => {
            showErrorMessage(`${field}: ${msg}`);
          });
        }
      });
      return;
    }
    if (response?.data?.status === 'success') {
      showSuccessMessage(response?.data?.message || 'Password Changed Successfully');
      resetForm();
    }
  };
  return useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    validateOnChange: true,
  });
};

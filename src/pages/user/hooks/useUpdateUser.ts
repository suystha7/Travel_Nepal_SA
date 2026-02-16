import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { UserSchema, type userFormField } from '../schema/UserSchema';
import { useGetUserDetails } from './useGetUserDetails';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdateUser = ({ closeModal, updateId }: IProps) => {
  const [updateUser, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading } = useGetUserDetails({ id: updateId });

  const initialValues: userFormField = {
    full_name: data?.data?.full_name || '',
    email: data?.data?.email || '',
    // avatar: data?.data?.avatar || '',
    phone_no: data?.data?.phone_no || '',
    is_active: data?.data?.is_active || false,
    is_admin: data?.data?.is_admin || false,
    is_staff: data?.data?.is_staff || false,
  };

  const formik = useFormik<userFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: UserSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('full_name', values.full_name);
      formData.append('email', values.email);
      formData.append('phone_no', values.phone_no);
      formData.append('password', String(values.password));
      formData.append('is_active', String(values.is_active));
      formData.append('is_admin', String(values.is_admin));
      formData.append('is_staff', String(values.is_staff));

      // if (values.avatar) {
      //   formData.append('avatar', values.avatar);
      // }

      const response = (await updateUser({
        url: Endpoints.user.update.replace('id', updateId),
        data: formData,
        invalidateTag: [apiTags.user.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
        formik.resetForm();
        closeModal();
      }

      if (response?.error?.data?.message) {
        showErrorMessage(response.error.data.message);
      }

      if (response?.error?.data?.errors) {
        handleErrors(response, formik.setErrors);
      }
    },
  });

  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading };
};

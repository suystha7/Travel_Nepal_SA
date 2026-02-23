import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { UserSchema, type userFormField } from '../schema/UserSchema';

interface IProps {
  closeModal: () => void;
}

export const useCreateUser = ({ closeModal }: IProps) => {
  const [createUser, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: userFormField = {
    full_name: '',
    email: '',
    phone_no: '',
    role: '',
    avatar: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: UserSchema,

    onSubmit: async values => {
      const formData = new FormData();

      formData.append('full_name', values.full_name);
      formData.append('email', values.email);
      formData.append('phone_no', values.phone_no);
      formData.append('role', values.role);

      // if (values.avatar) {
      //   formData.append('avatar', values.avatar);
      // }

      const response = (await createUser({
        url: Endpoints.user.create,
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

  return { formik, isError, isLoading, isSuccess };
};

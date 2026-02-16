import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { TeamSchema, type teamFormField } from '../schema/TeamSchema';

interface IProps {
  closeModal: () => void;
}

export const useCreateTeam = ({ closeModal }: IProps) => {
  const [createTeam, { isError, isLoading, isSuccess }] = usePostDataMutation();
  const initialValues: teamFormField = {
    name: '',
    role: '',
    bio: '',
    photo: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: TeamSchema,
    onSubmit: async values => {
      const formData = new FormData();

      // append text fields
      formData.append('name', values.name);
      formData.append('role', values.role);
      formData.append('bio', values.bio);

      if (values?.photo && values?.photo instanceof File) {
        formData.append('photo', values?.photo);
      }

      const response = (await createTeam({
        url: Endpoints?.aboutUs.team.list,
        data: formData,
        invalidateTag: [apiTags.aboutUs.team.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        formik.resetForm();
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return { formik, isError, isLoading, isSuccess };
};

import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { useGetTeamDetails } from './useGetTeamDetails';
import { TeamSchema, type teamFormField } from '../schema/TeamSchema';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdateTeam = ({ closeModal, updateId }: IProps) => {
  const [updateTeam, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();
  const { data, isLoading } = useGetTeamDetails({ id: updateId });

  const initialValues: teamFormField = {
    name: data?.data?.name || '',
    role: data?.data?.role || '',
    bio: data?.data?.bio || '',
    photo: data?.data?.photo || '',
  };
  const formik = useFormik<teamFormField>({
    initialValues,
    enableReinitialize: true,
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

      const response = (await updateTeam({
        url: Endpoints.aboutUs.team.update.replace(':id', updateId),
        data: formData,
        invalidateTag: [apiTags.aboutUs.team.list, apiTags.aboutUs.team.details],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading };
};

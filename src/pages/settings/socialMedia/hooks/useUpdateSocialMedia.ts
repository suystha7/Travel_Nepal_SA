import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import {
  SocialMediaSettingsSchema,
  type socialMediaSettingsFormField,
} from '../schema/SocialMediaSchema';
import { useGetSocialMediaDetails } from './useGetSocialMediaDetails';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdateSocialMedia = ({ closeModal, updateId }: IProps) => {
  const [updateSocialMedia, { isError, isLoading: isUpdating, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading: isGetDetailsLoading } = useGetSocialMediaDetails({
    id: updateId,
  });

  const initialValues: socialMediaSettingsFormField = {
    platform: data?.data?.platform || '',
    url: data?.data?.url || '',
    status: data?.data?.status || '',
  };

  const formik = useFormik<socialMediaSettingsFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: SocialMediaSettingsSchema,

    onSubmit: async values => {
      const formData = new FormData();
      formData.append('platform', values.platform);
      formData.append('url', values.url);
      formData.append('status', values.status);

      const response = (await updateSocialMedia({
        url: Endpoints.settings.socialMedia.update.replace('id', updateId),
        data: formData,
        invalidateTag: [apiTags.settings.socialMedia.list],
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

  return {
    formik,
    isError,
    isLoading: isUpdating,
    isSuccess,
    isGetDetailsLoading,
  };
};

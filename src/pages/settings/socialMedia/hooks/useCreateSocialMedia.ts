import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import {
  SocialMediaSettingsSchema,
  type socialMediaSettingsFormField,
} from '../schema/SocialMediaSchema';

interface IProps {
  closeModal: () => void;
}

export const useCreateSocialMedia = ({ closeModal }: IProps) => {
  const [createSocialMedia, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: socialMediaSettingsFormField = {
    platform: '',
    url: '',
    status: '',
  };

  const formik = useFormik<socialMediaSettingsFormField>({
    initialValues,
    validationSchema: SocialMediaSettingsSchema,

    onSubmit: async values => {
      const formData = new FormData();
      formData.append('platform', values.platform);
      formData.append('url', values.url);
      formData.append('status', values.status);

      const response = (await createSocialMedia({
        url: Endpoints.settings.socialMedia.list,
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

  return { formik, isError, isLoading, isSuccess };
};

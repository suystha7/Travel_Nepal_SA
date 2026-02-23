import { useUpdatePutDataMutation } from '@/api/api';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { AboutUsSchema, type aboutUsFormField } from '../schema/AboutUsSchema';
import { useGetAboutUsDetails } from './useGetAboutUsDetails';
import { Endpoints } from '@/api/endpoints';

export const useUpdateAboutUs = (updateId: string) => {
  const [updateAboutUs] = useUpdatePutDataMutation();

  const { data } = useGetAboutUsDetails({ id: updateId });

  const initialValues: aboutUsFormField = {
    title: data?.data?.title || '',
    sub_title: data?.data?.sub_title || '',
    description: data?.data?.description || '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: AboutUsSchema,
    enableReinitialize: true,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('sub_title', values.sub_title);
      formData.append('description', values.description);

      const response = (await updateAboutUs({
        url: Endpoints.aboutUs.about.update.replace(':id', updateId),
        data: formData,
        invalidateTag: [apiTags.aboutUs.about.list, apiTags.aboutUs.about.details],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
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

import { useUpdatePutDataMutation } from '@/api/api';
// import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { WhoWeAreSchema, type whoWeAreFormField } from '../schema/whoWeAreSchema';
import { useGetWhoWeAreDetails } from './useGetWhoWeAreDetails';

export const useUpdateWhoWeAre = (updateId: string) => {
  const [updateWhoWeAre] = useUpdatePutDataMutation();

  const { data: whoWeAreData, refetchWhoWeAreDetails } = useGetWhoWeAreDetails({ id: updateId });

  const initialValues: whoWeAreFormField = {
    title: whoWeAreData?.data?.title ?? '',
    images: Array.isArray(whoWeAreData?.data?.images) ? whoWeAreData.data.images : [],
    description: whoWeAreData?.data?.description ?? '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: WhoWeAreSchema,
    enableReinitialize: true,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('description', values.description);

      if (values.images instanceof File) {
        formData.append('images', values.images);
      }

      const response = (await updateWhoWeAre({
        url: '/who-we-are/' + updateId,
        data: formData,
        invalidateTag: [apiTags.aboutUs.whoWeAre.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
        refetchWhoWeAreDetails();
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

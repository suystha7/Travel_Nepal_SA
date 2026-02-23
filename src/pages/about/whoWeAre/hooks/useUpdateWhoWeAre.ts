import { useUpdatePutDataMutation } from '@/api/api';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { WhoWeAreSchema, type whoWeAreFormField } from '../schema/whoWeAreSchema';
import { useGetWhoWeAreDetails } from './useGetWhoWeAreDetails';
import { Endpoints } from '@/api/endpoints';

export const useUpdateWhoWeAre = (updateId: string) => {
  const [updateWhoWeAre] = useUpdatePutDataMutation();
  const { data: whoWeAreData } = useGetWhoWeAreDetails({ id: updateId });

  const initialValues: whoWeAreFormField = {
    title: whoWeAreData?.data?.title ?? '',
    image: Array.isArray(whoWeAreData?.data?.images)
      ? whoWeAreData.data.images.map((img: any) => img.image)
      : [],
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

      const newFiles: File[] = [];
      const existingImages: { image: string }[] = [];

      if (Array.isArray(values.image)) {
        values.image.forEach(img => {
          if (img instanceof File) {
            newFiles.push(img);
          } else if (typeof img === 'string') {
            existingImages.push({ image: img }); 
          }
        });
      }

      newFiles.forEach(file => formData.append('image', file));

      if (existingImages.length) {
        formData.append('existingImages', JSON.stringify(existingImages));
      }

      try {
        const response = (await updateWhoWeAre({
          url: Endpoints.aboutUs.whoWeAre.update.replace(':id', updateId),
          data: formData,
          invalidateTag: [apiTags.aboutUs.whoWeAre.list, apiTags.aboutUs.whoWeAre.details],
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
      } catch (error) {
        console.error('Update Who We Are Error:', error);
        showErrorMessage('Something went wrong while updating.');
      }
    },
  });

  return { formik };
};
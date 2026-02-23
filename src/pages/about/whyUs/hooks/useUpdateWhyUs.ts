import { useUpdatePutDataMutation } from '@/api/api';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { WhyUsSchema, type whyUsFormField } from '../schema/whyUsSchema';
import { useGetWhuUsDetails } from './useGetWhyUsDetails';
import { Endpoints } from '@/api/endpoints';

export const useUpdateWhyUs = (updateId: string) => {
  const [updateWhyUs] = useUpdatePutDataMutation();
  const { data: whyUsData } = useGetWhuUsDetails({ id: updateId });
  
  const listItemsRaw = whyUsData?.data?.listItems;
  const normalizedList = typeof listItemsRaw === 'string' ? JSON.parse(listItemsRaw) : listItemsRaw;

  const initialValues: whyUsFormField = {
    heading: whyUsData?.data?.heading ?? '',
    sub_heading: whyUsData?.data?.sub_heading ?? '',
    listItems:
      Array.isArray(normalizedList) && normalizedList.length > 0
        ? normalizedList.map((item: any) => ({
            title: item.title ?? '',
            description: item.description ?? '',
            ordering: item.ordering ?? 1,
          }))
        : [{ title: '', description: '', ordering: 1 }],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: WhyUsSchema,
    enableReinitialize: true,
    onSubmit: async values => {
      const formData = new FormData();
      formData.append('heading', values.heading);
      formData.append('sub_heading', values.sub_heading);

      if (values.listItems && values.listItems.length > 0) {
        values.listItems.forEach((item, index) => {
          formData.append(`listItems[${index}][title]`, item.title);
          formData.append(`listItems[${index}][description]`, item.description);
          formData.append(`listItems[${index}][ordering]`, String(item.ordering));
        });
      }

      try {
        const response = (await updateWhyUs({
          url: Endpoints.aboutUs.whyUs.update.replace(':id', updateId),
          data: formData,
          invalidateTag: [apiTags.aboutUs.whyUs.list, apiTags.aboutUs.whyUs.details],
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
        console.error('Update Why Us Error:', error);
        showErrorMessage('Something went wrong while updating.');
      }
    },
  });

  return { formik };
};

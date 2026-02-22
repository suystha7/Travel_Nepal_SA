import { usePostDataMutation } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { WhyUsSchema, type whyUsFormField } from '../schema/whyUsSchema';

export const useCreateWhyUs = () => {
  const [createWhyUs] = usePostDataMutation();

  const initialValues: whyUsFormField = {
    heading: '',
    sub_heading: '',
    listItems: [{ title: '', description: '', ordeing: 1 }],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: WhyUsSchema,
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

      const response = (await createWhyUs({
        url: Endpoints?.aboutUs.whyUs.create,
        data: formData,
        invalidateTag: [apiTags.aboutUs.whyUs.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
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

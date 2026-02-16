import { usePostDataMutation } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { AboutUsSchema, type aboutUsFormField } from '../schema/AboutUsSchema';

export const useCreateAboutUs = () => {
  const [createAboutUs] = usePostDataMutation();

  const initialValues: aboutUsFormField = { title: '', sub_title: '', description: '' };

  const formik = useFormik({
    initialValues,
    validationSchema: AboutUsSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('sub_title', values.sub_title);
      formData.append('description', values.description);

      const response = (await createAboutUs({
        url: Endpoints?.aboutUs.about.create,
        data: formData,
        invalidateTag: [apiTags.aboutUs.about.list],
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

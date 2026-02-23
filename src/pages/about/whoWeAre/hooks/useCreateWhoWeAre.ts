import { usePostDataMutation } from '@/api/api';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { WhoWeAreSchema, type whoWeAreFormField } from '../schema/whoWeAreSchema';

export const useCreateWhoWeAre = () => {
  const [createWhoWeAre] = usePostDataMutation();

  const initialValues: whoWeAreFormField = { title: '', description: '', image: [] };

  const formik = useFormik({
    initialValues,
    validationSchema: WhoWeAreSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('description', values.description);

      if (values.image instanceof File) {
        formData.append('image', values.image);
      }

      const response = (await createWhoWeAre({
        url: '/who-we-are',
        data: formData,
        invalidateTag: [apiTags.aboutUs.whoWeAre.list],
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

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    formik.setFieldValue('image', files);
  };

  return { formik, handleImagesChange };
};

import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { BreadcrumbSchema, type breadcrumbFormField } from '../schema/BreadcrumbSchema';

interface IProps {
  closeModal: () => void;
}

export const useCreateBreadcrumb = ({ closeModal }: IProps) => {
  const [createBreadcrumb, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: breadcrumbFormField = {
    title: '',
    description: '',
    subtitle: '',
    type: '',
    image: undefined,
    video: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: BreadcrumbSchema,
    onSubmit: async values => {
      const formData = new FormData();

      // append text fields
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('subtitle', values.subtitle);
      formData.append('type', values.type);

      if (values.image && typeof values.image !== 'string') {
        formData.append('image', values.image as File);
      }

      if (values?.video && values?.video instanceof File) {
        formData.append('video', values?.video);
      }

      const response = (await createBreadcrumb({
        url: Endpoints?.breadcrumb.list,
        data: formData,
        invalidateTag: [apiTags.breadcrumb.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        formik.resetForm();
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return { formik, isError, isLoading, isSuccess };
};

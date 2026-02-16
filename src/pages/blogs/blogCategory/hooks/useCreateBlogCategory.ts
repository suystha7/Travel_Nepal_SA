import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { BlogCategorySchema, type blogCategoryFormField } from '../schema/BlogCategorySchema';

interface IProps {
  closeModal: () => void;
}

export const useCreateBlogCategory = ({ closeModal }: IProps) => {
  const [createBlogCategory, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: blogCategoryFormField = {
    name: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: BlogCategorySchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('name', values.name);

      const response = (await createBlogCategory({
        url: Endpoints.blogs.blogCategory.list,
        data: formData,
        invalidateTag: [apiTags.blogs.blogCategory.list],
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

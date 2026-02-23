import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { BlogCategorySchema, type blogCategoryFormField } from '../schema/BlogCategorySchema';
import { useGetBlogCategoryDetails } from './useGetBlogCategoryDetails';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdateBlogCategory = ({ closeModal, updateId }: IProps) => {
  const [updateBlogCategory, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading } = useGetBlogCategoryDetails({
    id: updateId,
  });

  const initialValues: blogCategoryFormField = {
    name: data?.data?.name || '',
  };
  const formik = useFormik<blogCategoryFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: BlogCategorySchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('name', values.name);

      const response = (await updateBlogCategory({
        url: Endpoints.blogs.blogCategory.update.replace(':id', updateId),
        data: formData,
        invalidateTag: [apiTags.blogs.blogCategory.list, apiTags.blogs.blogCategory.details],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading };
};

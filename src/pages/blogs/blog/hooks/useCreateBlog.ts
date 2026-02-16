import { useGetDataQuery, usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { BlogSchema, type blogFormField } from '../schema/BlogSchema';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
}

interface ILookupRecordBlog {
  id: number | string;
  name: string;
}
interface ILookupRecordUser {
  id: number | string;
  full_name: string;
}

export const useCreateBlog = ({ closeModal }: IProps) => {
  const [createBlog, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const { data: userData } = useGetDataQuery({
    url: Endpoints.user.list,
    params: { p: 1, page_size: 100 },
    tag: apiTags.user.list,
  });

  const { data: blogCategoryData } = useGetDataQuery({
    url: Endpoints.blogs.blogCategory.list,
    params: { p: 1, page_size: 100 },
    tag: apiTags.blogs.blogCategory.list,
  });

  const toOptionsBlog = (items?: ILookupRecordBlog[]) =>
    items?.map(item => ({
      label: item?.name,
      value: item?.id,
    })) || [];

  const toOptionsUser = (items?: ILookupRecordUser[]) =>
    items?.map(item => ({
      label: item?.full_name,
      value: item?.id,
    })) || [];

  const authorOptions = useMemo(() => toOptionsUser(userData?.data?.records), [userData]);

  const blogCategoryOptions = useMemo(
    () => toOptionsBlog(blogCategoryData?.data?.records),
    [blogCategoryData]
  );

  const initialValues: blogFormField = {
    title: '',
    description: '',
    author_id: '',
    category_id: '',
    is_popular: false,
    image: undefined,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: BlogSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('author_id', values.author_id);
      formData.append('category_id', values.category_id);
      formData.append('is_popular', String(values.is_popular));

      if (values.image && typeof values.image !== 'string') {
        formData.append('image', values.image as File);
      }

      const response = (await createBlog({
        url: Endpoints.blogs.blog.list,
        data: formData,
        invalidateTag: [apiTags.blogs.blog.list],
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

  return {
    formik,
    isError,
    isLoading,
    isSuccess,
    authorOptions,
    blogCategoryOptions,
  };
};

import { useGetDataQuery, useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { BlogSchema, type blogFormField } from '../schema/BlogSchema';
import { useGetBlogDetails } from './useGetBlogDetails';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

interface ILookupRecordBlog {
  id: number | string;
  name: string;
}

interface ILookupRecordUser {
  id: number | string;
  full_name: string;
}

export const useUpdateBlog = ({ closeModal, updateId }: IProps) => {
  const [updateBlog, { isError, isLoading, isSuccess }] = useUpdatePutDataMutation();

  const {
    data: blogData,
    isLoading: isGetDetailsLoading,
    refetchBlogDetails,
  } = useGetBlogDetails({ id: updateId });

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
      value: item?.id || '',
    })) || [];

  const toOptionsUser = (items?: ILookupRecordUser[]) =>
    items?.map(item => ({
      label: item?.full_name,
      value: item?.id || '',
    })) || [];

  const authorOptions = useMemo(() => toOptionsUser(userData?.data?.records), [userData]);
  const blogCategoryOptions = useMemo(
    () => toOptionsBlog(blogCategoryData?.data?.records),
    [blogCategoryData]
  );

  const initialValues: blogFormField = {
    title: blogData?.data?.title || '',
    description: blogData?.data?.description || '',
    author_id: blogData?.data?.author?.id || '',
    category_id: blogData?.data?.category?.id || '',
    is_popular: blogData?.data?.is_popular || false,
    image: blogData?.data?.image || '',
  };

  const formik = useFormik<blogFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: BlogSchema,
    onSubmit: async values => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('author_id', values.author_id);
      formData.append('is_popular', String(values.is_popular));
      formData.append('category_id', values.category_id);
      if (values.image && typeof values.image !== 'string') {
        formData.append('image', values.image as File);
      }

      const response = (await updateBlog({
        url: Endpoints.blogs.blog.update.replace('id', updateId),
        data: formData,
        invalidateTag: [apiTags.blogs.blog.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
        refetchBlogDetails();
        formik.resetForm();
        closeModal();
      }

      if (response?.error?.data?.message) showErrorMessage(response.error.data.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });

  return {
    formik,
    isError,
    isLoading,
    isSuccess,
    isGetDetailsLoading,
    authorOptions,
    blogCategoryOptions,
  };
};

import { useGetDataQuery, useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { useMemo } from 'react';
import { BlogImageSeoSchema, type blogImageSeoFormField } from '../schema/BlogImageSeoSchema';
import { useGetBlogImageSeoDetails } from './useGetBlogImageSeoDetails';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

interface ILookupRecordBlog {
  id: number | string;
  title: string;
}

export const useUpdateBlogImageSeo = ({ closeModal, updateId }: IProps) => {
  const [updateBlogImageSeo, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading } = useGetBlogImageSeoDetails({
    id: updateId,
  });

  const initialValues: blogImageSeoFormField = {
    blog_id: data?.data?.blog?.id || '',
    image: data?.data?.image || '',
    title: data?.data?.title || '',
    caption: data?.data?.caption || '',
    alt: data?.data?.alt || '',
  };

  const formik = useFormik<blogImageSeoFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: BlogImageSeoSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('blog_id', values.blog_id);

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values?.image);
      }

      const response = (await updateBlogImageSeo({
        url: Endpoints.blogs.blogImageSeo.update.replace(':id', updateId),
        data: formData,
        invalidateTag: [apiTags.blogs.blogImageSeo.list, apiTags.blogs.blogImageSeo.details],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });

  const { data: blogData } = useGetDataQuery({
    url: Endpoints.blogs.blog.list,
    params: { p: 1, page_size: 100 },
    tag: apiTags.blogs.blog.list,
  });

  const toOptionsBlog = (items?: ILookupRecordBlog[]) =>
    items?.map(item => ({
      label: item?.title,
      value: item?.id,
    })) || [];

  const blogOptions = useMemo(() => toOptionsBlog(blogData?.data?.records), [blogData]);

  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading, blogOptions };
};

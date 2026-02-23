import { useGetDataQuery, useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { BlogImageSchema, type blogImageFormField } from '../schema/BlogImageSchema';
import { useGetBlogImageDetails } from './useGetBlogImageDetails';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

interface ILookupRecordBlog {
  id: number | string;
  title: string;
}

export const useUpdateBlogImage = ({ closeModal, updateId }: IProps) => {
  const [updateBlogImage, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading } = useGetBlogImageDetails({
    id: updateId,
  });

  const initialValues: blogImageFormField = {
    blog_id: data?.data?.blog?.id || '',
    image: data?.data?.image || '',
  };

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

  const formik = useFormik<blogImageFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: BlogImageSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('blog_id', values.blog_id);

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values?.image);
      }

      const response = (await updateBlogImage({
        url: Endpoints.blogs.blogImage.update.replace(':id', updateId),
        data: formData,
        invalidateTag: [apiTags.blogs.blogImage.list, apiTags.blogs.blogImage.details],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading, blogOptions };
};

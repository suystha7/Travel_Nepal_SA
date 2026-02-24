import { useGetDataQuery, usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { BlogImageSeoSchema, type blogImageSeoFormField } from '../schema/BlogImageSeoSchema';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
}

interface ILookupRecordBlog {
  id: number | string;
  title: string;
}

export const useCreateBlogImageSeo = ({ closeModal }: IProps) => {
  const [createBlogImageSeo, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: blogImageSeoFormField = {
    blog_id: '',
    image: '',
    title: '',
    caption: '',
    alt: '',
  };

  const { data: blogData } = useGetDataQuery({
    url: Endpoints.blogs.blog.list,
    params: { p: 1, page_size: 100 },
    tag: apiTags.blogs.blog.list,
  });

  const toOptions = (items?: ILookupRecordBlog[]) =>
    items?.map(item => ({
      label: item?.title,
      value: item?.id,
    })) || [];

  const blogOptions = useMemo(() => toOptions(blogData?.data?.records), [blogData]);

  const formik = useFormik({
    initialValues,
    validationSchema: BlogImageSeoSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('blog_id', values.blog_id);

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values?.image);
      }

      const response = (await createBlogImageSeo({
        url: Endpoints.blogs.blogImageSeo.list,
        data: formData,
        invalidateTag: [apiTags.blogs.blogImageSeo.list],
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
    blogOptions,
  };
};

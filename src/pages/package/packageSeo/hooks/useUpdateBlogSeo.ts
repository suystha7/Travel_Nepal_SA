import { useGetDataQuery, useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { useGetBlogSeoDetails } from './useGetBlogSeoDetails';
import { BlogSeoSchema, type blogSeoFormField } from '../schema/BlogSeoSchema';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

interface ILookupRecordBlog {
  id: number | string;
  title: string;
}

export const useUpdateBlogSeo = ({ closeModal, updateId }: IProps) => {
  const [updateSEO, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading } = useGetBlogSeoDetails({
    id: updateId,
  });

  const initialValues: blogSeoFormField = {
    meta_title: data?.data?.meta_title || '',
    meta_description: data?.data?.meta_description || '',
    meta_Keywords: data?.data?.meta_Keywords || [],
    og_title: data?.data?.og_title || '',
    og_description: data?.data?.og_description || '',
    og_image: data?.data?.og_image || '',
    og_url: data?.data?.og_url || '',
    canonical_url: data?.data?.canonical_url || '',
    robots: data?.data?.robots || '',
    blog_id: data?.data?.blog?.id || '',
    image_url: data?.data?.image_url || '',
    image_title: data?.data?.image_title || '',
    image_caption: data?.data?.image_caption || '',
    image_alt: data?.data?.image_alt || '',
  };

  const formik = useFormik<blogSeoFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: BlogSeoSchema,

    onSubmit: async values => {
      const formData = new FormData();
      formData.append('meta_title', values.meta_title);
      formData.append('meta_description', values.meta_description);
      formData.append('meta_Keywords', JSON.stringify(values.meta_Keywords));
      formData.append('og_title', values.og_title);
      formData.append('og_description', values.og_description);
      formData.append('og_url', values.og_url);
      formData.append('canonical_url', values.canonical_url);
      formData.append('robots', values.robots || '');
      formData.append('blog_id', values.blog_id);
      formData.append('image_url', values.image_url || '');
      formData.append('image_title', values.image_title);
      formData.append('image_caption', values.image_caption);
      formData.append('image_alt', values.image_alt);
      if (values?.og_image && values?.og_image instanceof File)
        formData.append('og_image', values.og_image);

      const response = (await updateSEO({
        url: Endpoints.settings.seo.update.replace(':id', updateId),
        data: formData,
        invalidateTag: [apiTags.settings.seo.list, apiTags.settings.seo.details],
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

  const toOptions = (items?: ILookupRecordBlog[]) =>
    items?.map(item => ({
      label: item?.title,
      value: item?.id,
    })) || [];

  const blogOptions = useMemo(() => toOptions(blogData?.data?.records), [blogData]);

  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading, blogOptions };
};

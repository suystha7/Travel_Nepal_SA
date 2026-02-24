import { useGetDataQuery, useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { useMemo } from 'react';
import {
  PackageImageSeoSchema,
  type packageImageSeoFormField,
} from '../schema/PackageImageSeoSchema';
import { useGetPackageImageSeoDetails } from './useGetPackageImageSeoDetails';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

interface ILookupRecordPackage {
  id: number | string;
  name: string;
}

export const useUpdateBlogImageSeo = ({ closeModal, updateId }: IProps) => {
  const [updateBlogImageSeo, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading } = useGetPackageImageSeoDetails({
    id: updateId,
  });

  const initialValues: packageImageSeoFormField = {
    package_id: data?.data?.package?.id || '',
    image: data?.data?.image || '',
    title: data?.data?.title || '',
    caption: data?.data?.caption || '',
    alt: data?.data?.alt || '',
  };

  const formik = useFormik<packageImageSeoFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: PackageImageSeoSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('package_id', values.package_id);

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values?.image);
      }

      const response = (await updateBlogImageSeo({
        url: Endpoints.packages.packageImageSeo.update.replace(':id', updateId),
        data: formData,
        invalidateTag: [
          apiTags.packages.packageImageSeo.list,
          apiTags.packages.packageImageSeo.details,
        ],
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

  const toOptionsPackage = (items?: ILookupRecordPackage[]) =>
    items?.map(item => ({
      label: item?.name,
      value: item?.id,
    })) || [];

  const packageOptions = useMemo(() => toOptionsPackage(blogData?.data?.records), [blogData]);

  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading, packageOptions };
};

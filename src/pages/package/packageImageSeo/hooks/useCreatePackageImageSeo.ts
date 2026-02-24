import { useGetDataQuery, usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import {
  PackageImageSeoSchema,
  type packageImageSeoFormField,
} from '../schema/PackageImageSeoSchema';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
}

interface ILookupRecordPackage {
  id: number | string;
  name: string;
}

export const useCreatePackageImageSeo = ({ closeModal }: IProps) => {
  const [createPackageImageSeo, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: packageImageSeoFormField = {
    package_id: '',
    image: '',
    title: '',
    caption: '',
    alt: '',
  };

  const { data: packageData } = useGetDataQuery({
    url: Endpoints.packages.package.list,
    params: { p: 1, page_size: 100 },
    tag: apiTags.packages.package.list,
  });

  const toOptions = (items?: ILookupRecordPackage[]) =>
    items?.map(item => ({
      label: item?.name,
      value: item?.id,
    })) || [];

  const packageOptions = useMemo(() => toOptions(packageData?.data?.records), [packageData]);

  const formik = useFormik({
    initialValues,
    validationSchema: PackageImageSeoSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('package_id', values.package_id);

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values?.image);
      }

      const response = (await createPackageImageSeo({
        url: Endpoints.packages.packageImageSeo.list,
        data: formData,
        invalidateTag: [apiTags.packages.packageImageSeo.list],
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
    packageOptions,
  };
};

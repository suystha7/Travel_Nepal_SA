import { useGetDataQuery, useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import {
  PackageCategorySchema,
  type packageCategoryFormField,
} from '../schema/PackageCategorySchema';
import { useGetPackageCategoryDetails } from './useGetPackageCategoryDetails';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

interface ILookupRecordPackageType {
  id: number | string;
  name: string;
}

export const useUpdatePackageCategory = ({ closeModal, updateId }: IProps) => {
  const [updatePackageCategory, { isError, isLoading: isUpdating, isSuccess }] =
    useUpdatePutDataMutation();
  const { data, isLoading: isGetDetailsLoading } = useGetPackageCategoryDetails({ id: updateId });

  const initialValues: packageCategoryFormField = {
    name: data?.data?.name || '',
    image: data?.data?.image || '',
    package_type_id: data?.data?.package_type?.id || '',
  };

  const { data: packageTypeData } = useGetDataQuery({
    url: Endpoints.packages.packageType.list,
    params: { p: 1, page_size: 100 },
    tag: apiTags.packages.packageType.list,
  });

  const toOptionsPackageType = (items?: ILookupRecordPackageType[]) =>
    items?.map(item => ({
      label: item?.name,
      value: item?.id,
    })) || [];

  const packageTypeOptions = useMemo(
    () => toOptionsPackageType(packageTypeData?.data?.records),
    [packageTypeData]
  );

  const formik = useFormik<packageCategoryFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: PackageCategorySchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('name', values.name);

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values.image);
      }

      const response = (await updatePackageCategory({
        url: Endpoints.packages.packageCategory.update.replace('id', updateId),
        data: formData,
        invalidateTag: [apiTags.packages.packageCategory.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
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
    isLoading: isUpdating,
    isSuccess,
    isGetDetailsLoading,
    packageTypeOptions,
  };
};

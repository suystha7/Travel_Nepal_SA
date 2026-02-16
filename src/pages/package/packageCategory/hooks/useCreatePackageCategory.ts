import { useGetDataQuery, usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import {
  PackageCategorySchema,
  type packageCategoryFormField,
} from '../schema/PackageCategorySchema';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
}

interface ILookupRecordPackageType {
  id: number | string;
  name: string;
}

export const useCreatePackageCategory = ({ closeModal }: IProps) => {
  const [createPackageCategory, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: packageCategoryFormField = {
    name: '',
    image: '',
    package_type_id: '',
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

  const formik = useFormik({
    initialValues,
    validationSchema: PackageCategorySchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('package_type_id', values.package_type_id);

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values.image);
      }

      const response = (await createPackageCategory({
        url: Endpoints?.packages.packageCategory.list,
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

  return { formik, isError, isLoading, isSuccess, packageTypeOptions };
};

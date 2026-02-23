import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { PackageGallerySchema, type packageGalleryFormField } from '../schema/PackageGallerySchema';
import { useGetPackage } from '../../package/hooks/useGetPackage';
import type { IOption } from '@/types/common';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
}

export const useCreatePackageGallery = ({ closeModal }: IProps) => {
  const [createPackageGallery, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const { packageData } = useGetPackage();

  const packageOptions: IOption[] = useMemo(() => {
    return (
      packageData?.data?.records?.map(item => ({
        label: item?.name,
        value: item?.id,
      })) || []
    );
  }, [packageData]);

  const formik = useFormik<packageGalleryFormField>({
    initialValues: {
      url: [],
      package_id: '',
    },
    validationSchema: PackageGallerySchema,
    onSubmit: async values => {
      const formData = new FormData();
      formData.append('package_id', values.package_id || '');

      if (values?.url && values?.url instanceof File) {
        formData.append('url', values.url);
      }

      const response = (await createPackageGallery({
        url: Endpoints.packages.packageGallery.list,
        data: formData,
        invalidateTag: [apiTags.packages.packageGallery.list],
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

  return { formik, isError, isLoading, isSuccess, packageOptions };
};

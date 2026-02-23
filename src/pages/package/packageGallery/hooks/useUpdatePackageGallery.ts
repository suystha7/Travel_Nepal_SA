import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { PackageGallerySchema, type packageGalleryFormField } from '../schema/PackageGallerySchema';
import { useGetPackageGalleryDetails } from './useGetPackageGalleryDetails';
import { useGetPackage } from '../../package/hooks/useGetPackage';
import { useMemo } from 'react';
import type { IOption } from '@/types/common';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdatePackageGallery = ({ closeModal, updateId }: IProps) => {
  const [updatePackageGallery, { isError, isLoading: isUpdating, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading: isGetDetailsLoading } = useGetPackageGalleryDetails({ id: updateId });

  const initialValues: packageGalleryFormField = {
    url: Array.isArray(data?.data?.images) ? data.data.images.map((img: any) => img.url) : [],
    package_id: data?.data?.package?.id || '',
  };

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
    initialValues,
    enableReinitialize: true,
    validationSchema: PackageGallerySchema,
    onSubmit: async values => {
      const formData = new FormData();
      formData.append('package_id', values.package_id || '');

      const newFiles: File[] = [];
      const existingImages: { url: string }[] = [];

      if (Array.isArray(values?.url)) {
        values.url.forEach((img: any) => {
          if (img instanceof File) {
            newFiles.push(img);
          } else if (typeof img === 'string') {
            existingImages.push({ url: img });
          }
        });
      }

      newFiles.forEach(file => formData.append('url', file));

      if (existingImages.length) {
        formData.append('existingImages', JSON.stringify(existingImages));
      }

      const response = (await updatePackageGallery({
        url: Endpoints.packages.packageGallery.update.replace(':id', updateId),
        data: formData,
        invalidateTag: [
          apiTags.packages.packageGallery.list,
          apiTags.packages.packageGallery.details,
        ],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
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
    packageOptions,
  };
};

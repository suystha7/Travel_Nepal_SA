'use client';

import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { PackageGallerySchema } from '../schema/PackageGallerySchema';
import { useGetPackageGalleryDetails } from './useGetPackageGalleryDetails';
import { useGetPackage } from '../../package/hooks/useGetPackage';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdatePackageGallery = ({ closeModal, updateId }: IProps) => {
  const [updatePackageGallery, { isError, isLoading: isUpdating, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading: isGetDetailsLoading } = useGetPackageGalleryDetails({ id: updateId });

  const initialValues = {
    images: data?.data?.image?.url
      ? [{ id: String(data?.data?.image?.id || ''), url: data?.data?.image?.url }]
      : [],
    package_id: data?.data?.package?.id || '',
  };

  const { packageData } = useGetPackage();

  const packageOptions = useMemo(() => {
    return (
      packageData?.data?.records?.map(item => ({
        label: item?.name,
        value: item?.id,
      })) || []
    );
  }, [packageData]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: PackageGallerySchema,
    onSubmit: async values => {
      const formData = new FormData();

      if (values.package_id) {
        formData.append('package_id', values.package_id);
      }

      if (Array.isArray(values.images)) {
        values.images.forEach(img => {
          if (img instanceof File) {
            formData.append('images[]', img);
          } else if (img && typeof img === 'object' && img.id) {
            formData.append('existing_images[]', JSON.stringify(img));
          }
        });
      }

      const response = await updatePackageGallery({
        url: Endpoints.packages.packageGallery.update.replace('id', updateId),
        data: formData,
        invalidateTag: [apiTags.packages.packageGallery.list],
      });

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
    isLoading: isUpdating,
    isSuccess,
    isGetDetailsLoading,
    packageOptions,
  };
};

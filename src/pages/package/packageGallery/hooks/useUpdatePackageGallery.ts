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
    type: data?.data?.type || '',
    image: data?.data?.image || '',
    package_id: data?.data?.package?.id || '',
    itinerary_id: data?.data?.itinerary?.id || '',
  };

  const { packageData, packageItineraryData } = useGetPackage();

  const packageOptions: IOption[] = useMemo(() => {
    return (
      packageData?.data?.records?.map(item => ({
        label: item?.name,
        value: item?.id,
      })) || []
    );
  }, [packageData]);

  const itineraryOptions: IOption[] = useMemo(() => {
    return (
      packageItineraryData?.data?.records?.flatMap(
        record =>
          record?.itinerary?.map(it => ({
            label: it.title,
            value: it.id,
          })) || []
      ) || []
    );
  }, [packageItineraryData]);

  const formik = useFormik<packageGalleryFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: PackageGallerySchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('type', values.type);

      if (values.type === 'Package' && values.package_id) {
        formData.append('package_id', values.package_id);
      } else if (values.type === 'Itinerary' && values.itinerary_id) {
        formData.append('itinerary_id', values.itinerary_id);
      }

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values.image);
      }
      const response = (await updatePackageGallery({
        url: Endpoints.packages.packageGallery.update.replace('id', updateId),
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

  return {
    formik,
    isError,
    isLoading: isUpdating,
    isSuccess,
    isGetDetailsLoading,
    packageOptions,
    itineraryOptions,
  };
};

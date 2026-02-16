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
// import { useGetPackageItinerary } from '../../packageItinerary/hooks/useGetPackageItinerary';

interface IProps {
  closeModal: () => void;
}

export const useCreatePackageGallery = ({ closeModal }: IProps) => {
  const [createPackageGallery, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: packageGalleryFormField = {
    type: '',
    image: '',
    package_id: '',
    itinerary_id: '',
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

  console.log('first', packageItineraryData);

  const formik = useFormik({
    initialValues,
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

      const response = (await createPackageGallery({
        url: Endpoints?.packages.packageGallery.list,
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

  return { formik, isError, isLoading, isSuccess, packageOptions, itineraryOptions };
};

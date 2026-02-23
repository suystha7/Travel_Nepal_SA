import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { PackageVideoSchema, type packageVideoFormField } from '../schema/PackageVideoSchema';
import { useGetPackageVideoDetails } from './useGetPackageVideoDetails';
import type { IOption } from '@/types/common';
import { useMemo } from 'react';
import { useGetPackage } from '../../package/hooks/useGetPackage';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdatePackageVideo = ({ closeModal, updateId }: IProps) => {
  const [updatePackageVideo, { isError, isLoading: isUpdating, isSuccess }] =
    useUpdatePutDataMutation();
  const { data, isLoading: isGetDetailsLoading } = useGetPackageVideoDetails({ id: updateId });

  const initialValues: packageVideoFormField = {
    video: data?.data?.video || '',
    video_url: data?.data?.video_url || '',
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

  const formik = useFormik<packageVideoFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: PackageVideoSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('package_id', values.package_id);
      formData.append('video_url', values.video_url);

      if (values?.video && values?.video instanceof File) {
        formData.append('video', values.video);
      }

      const response = (await updatePackageVideo({
        url: Endpoints.packages.packageVideo.update.replace(':id', updateId),
        data: formData,
        invalidateTag: [apiTags.packages.packageVideo.list, apiTags.packages.packageVideo.details],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response.error.data.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });

  return { formik, isError, isLoading: isUpdating, isSuccess, isGetDetailsLoading, packageOptions };
};

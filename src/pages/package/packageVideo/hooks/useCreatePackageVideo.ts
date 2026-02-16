import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { PackageVideoSchema, type packageVideoFormField } from '../schema/PackageVideoSchema';
import { useGetPackage } from '../../package/hooks/useGetPackage';
import type { IOption } from '@/types/common';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
}

export const useCreatePackageVideo = ({ closeModal }: IProps) => {
  const [createPackageVideo, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: packageVideoFormField = {
    package_id: '',
    video: '',
    video_url: '',
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

  const formik = useFormik({
    initialValues,
    validationSchema: PackageVideoSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('package_id', values.package_id);
      formData.append('video_url', String(values.video_url));

      if (values?.video && values?.video instanceof File) {
        formData.append('video', values.video);
      }

      const response = (await createPackageVideo({
        url: Endpoints?.packages.packageVideo.list,
        data: formData,
        invalidateTag: [apiTags.packages.packageVideo.list],
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

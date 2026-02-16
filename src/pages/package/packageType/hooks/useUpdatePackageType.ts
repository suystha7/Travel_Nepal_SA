import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { PackageTypeSchema, type packageTypeFormField } from '../schema/PackageTypeSchema';
import { useGetPackageTypeDetails } from './useGetPackageTypeDetails';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdatePackageType = ({ closeModal, updateId }: IProps) => {
  const [updatePackageType, { isError, isLoading: isUpdating, isSuccess }] =
    useUpdatePutDataMutation();
  const { data, isLoading: isGetDetailsLoading } = useGetPackageTypeDetails({ id: updateId });

  const initialValues: packageTypeFormField = {
    name: data?.data?.name || '',
    image: data?.data?.image || '',
  };

  const formik = useFormik<packageTypeFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: PackageTypeSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('name', values.name);

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values.image);
      }

      const response = (await updatePackageType({
        url: Endpoints.packages.packageType.update.replace('id', updateId),
        data: formData,
        invalidateTag: [apiTags.packages.packageType.list],
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

  return { formik, isError, isLoading: isUpdating, isSuccess, isGetDetailsLoading };
};

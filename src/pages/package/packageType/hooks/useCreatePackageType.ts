import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { PackageTypeSchema, type packageTypeFormField } from '../schema/PackageTypeSchema';

interface IProps {
  closeModal: () => void;
}

export const useCreatePackageType = ({ closeModal }: IProps) => {
  const [createPackageType, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: packageTypeFormField = {
    name: '',
    image: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: PackageTypeSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('name', values.name);

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values.image);
      }

      const response = (await createPackageType({
        url: Endpoints?.packages.packageType.list,
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

  return { formik, isError, isLoading, isSuccess };
};

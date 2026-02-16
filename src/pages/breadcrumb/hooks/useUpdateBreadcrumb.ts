import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { useGetBreadcrumbDetails } from './useGetBreadcrumbDetails';
import { BreadcrumbSchema, type breadcrumbFormField } from '../schema/BreadcrumbSchema';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdateBreadcrumb = ({ closeModal, updateId }: IProps) => {
  const [updateBreadcrumb, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();

  const {
    data: breadcrumbData,
    isLoading,
    refetchBreadcrumbDetails,
  } = useGetBreadcrumbDetails({ id: updateId });

  const initialValues: breadcrumbFormField = {
    title: breadcrumbData?.data?.title || '',
    description: breadcrumbData?.data?.description || '',
    subtitle: breadcrumbData?.data?.subtitle || '',
    type: breadcrumbData?.data?.type || '',
    image: breadcrumbData?.data?.image || '',
    video: breadcrumbData?.data?.video || '',
  };

  const formik = useFormik<breadcrumbFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: BreadcrumbSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('subtitle', values.subtitle);
      formData.append('type', values.type);

      if (values.image && typeof values.image !== 'string') {
        formData.append('image', values.image as File);
      }
      if (values?.video && values?.video instanceof File) {
        formData.append('video', values?.video);
      }

      const response = (await updateBreadcrumb({
        url: Endpoints.breadcrumb.update.replace('id', updateId),
        data: formData,
        invalidateTag: [apiTags.breadcrumb.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        formik.resetForm();
        refetchBreadcrumbDetails();
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading };
};

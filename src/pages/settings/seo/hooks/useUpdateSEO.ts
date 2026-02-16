import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { useGetSEODetails } from './useGetSEODetails';
import { SEOSchema, type seoFormField } from '../schema/SeoSchema';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdateSEO = ({ closeModal, updateId }: IProps) => {
  const [updateSEO, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading, refetchSEODetails } = useGetSEODetails({
    id: updateId,
  });

  const initialValues: seoFormField = {
    meta_title: data?.data?.meta_title || '',
    meta_description: data?.data?.meta_description || '',
    meta_Keywords: data?.data?.meta_Keywords || [],
    og_title: data?.data?.og_title || '',
    og_description: data?.data?.og_description || '',
    og_image: data?.data?.og_image || '',
    og_url: data?.data?.og_url || '',
    canonical_url: data?.data?.canonical_url || '',
    robots: data?.data?.robots || '',
    seo_for: data?.data?.seo_for || '',
  };
  const formik = useFormik<seoFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: SEOSchema,

    onSubmit: async values => {
      const formData = new FormData();
      formData.append('meta_title', values.meta_title);
      formData.append('meta_description', values.meta_description);
      formData.append('meta_Keywords', JSON.stringify(values.meta_Keywords));
      formData.append('og_title', values.og_title);
      formData.append('og_description', values.og_description);
      formData.append('og_url', values.og_url);
      formData.append('canonical_url', values.canonical_url);
      formData.append('robots', values.robots || '');
      formData.append('seo_for', values.seo_for);
      if (values?.og_image && values?.og_image instanceof File)
        formData.append('og_image', values.og_image);

      const response = (await updateSEO({
        url: Endpoints.settings.seo.update.replace('id', updateId),
        data: formData,
        invalidateTag: [apiTags.settings.seo.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        formik.resetForm();
        refetchSEODetails();
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading };
};

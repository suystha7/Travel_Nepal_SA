import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { SEOSchema, type seoFormField } from '../schema/SeoSchema';

interface IProps {
  closeModal: () => void;
}

export const useCreateSEO = ({ closeModal }: IProps) => {
  const [createSEO, { isError, isLoading, isSuccess }] = usePostDataMutation();
  const initialValues: seoFormField = {
    meta_title: '',
    meta_description: '',
    meta_Keywords: [],
    og_title: '',
    og_description: '',
    og_image: null,
    og_url: '',
    canonical_url: '',
    robots: '',
    seo_for: '',
  };
  const formik = useFormik<seoFormField>({
    initialValues,
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

      const response = (await createSEO({
        url: Endpoints.settings.seo.create,
        data: formData,
        invalidateTag: [apiTags.settings.seo.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        formik.resetForm();
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return { formik, isError, isLoading, isSuccess };
};

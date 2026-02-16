import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { TestimonialSchema, type testimonialFormField } from '../schema/TestimonialSchema';
import { useGetTestimonialDetails } from './useGetTestimonialDetails';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdateTestimonial = ({ closeModal, updateId }: IProps) => {
  const [updateTestimonial, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();
  const { data, isLoading } = useGetTestimonialDetails({ id: updateId });
  const initialValues: testimonialFormField = {
    name: data?.data?.name || '',
    message: data?.data?.message || '',
    rating: data?.data?.rating || '0',
    image: null,
  };
  const formik = useFormik<testimonialFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: TestimonialSchema,
    onSubmit: async values => {
      const formData = new FormData();

      // append text fields
      formData.append('name', values.name);
      formData.append('message', values.message);
      formData.append('rating', values.rating.toString());

      // append file fields

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values?.image);
      }

      const response = (await updateTestimonial({
        url: Endpoints.testimonial.update.replace('id', updateId),
        data: formData,
        invalidateTag: [apiTags.testimonial.list],
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
  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading };
};

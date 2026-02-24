import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { TestimonialSchema, type testimonialFormField } from '../schema/TestimonialSchema';

interface IProps {
  closeModal: () => void;
}

export const useCreateTestimonial = ({ closeModal }: IProps) => {
  const [createTestimonial, { isError, isLoading, isSuccess }] = usePostDataMutation();
  const initialValues: testimonialFormField = {
    name: '',
    message: '',
    rating: '0',
    image: null,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: TestimonialSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('message', values.message);
      formData.append('rating', values.rating.toString());

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values?.image);
      }

      const response = (await createTestimonial({
        url: Endpoints?.testimonials.list,
        data: formData,
        invalidateTag: [apiTags.testimonials.list],
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

import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { BookingSchema, type bookingFormField } from '../schema/BookingSchema';

interface IProps {
  closeModal: () => void;
}

export const useCreateBooking = ({ closeModal }: IProps) => {
  const [createBooking, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: bookingFormField = {
    title: '',
    description: '',
    image: '',
    customer: '',
    customer_id: '',
    service: '',
    service_id: '',
    is_urgent: false,
    booking_count: '',
    view_count: '',
    booking_slug: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: BookingSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('customer', values.customer);
      formData.append('customer_id', values.customer_id);
      formData.append('service', values.service);
      formData.append('service_id', values.service_id);
      formData.append('is_urgent', String(values.is_urgent));
      formData.append('booking_count', Number(values.booking_count).toString());
      formData.append('view_count', Number(values.view_count).toString());
      formData.append('booking_slug', values.booking_slug);

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values.image);
      }

      const response = (await createBooking({
        url: Endpoints.booking.list,
        data: formData,
        invalidateTag: [apiTags.booking.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
        formik.resetForm();
        closeModal();
      }

      if (response?.error?.data?.message) {
        showErrorMessage(response.error.data.message);
      }

      if (response?.error?.data?.errors) {
        handleErrors(response, formik.setErrors);
      }
    },
  });

  return { formik, isError, isLoading, isSuccess };
};

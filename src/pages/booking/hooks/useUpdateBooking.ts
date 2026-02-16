import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { BookingSchema, type bookingFormField } from '../schema/BookingSchema';
import { useGetBookingDetails } from './useGetBookingDetails';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdateBooking = ({ closeModal, updateId }: IProps) => {
  const [updateBooking, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading, refetchBookingDetails } = useGetBookingDetails({ id: updateId });

  const initialValues: bookingFormField = {
    title: data?.data?.title || '',
    description: data?.data?.description || '',
    image: data?.data?.image || '',

    booking_count: data?.data?.booking_count || '',
    view_count: data?.data?.view_count || '',

    customer: data?.data?.customer || '',
    customer_id: data?.data?.customer_id || '',

    service: data?.data?.service || '',
    service_id: data?.data?.service_id || '',

    is_urgent: data?.data?.is_urgent || false,
    booking_slug: data?.data?.booking_slug || '',
  };

  const formik = useFormik<bookingFormField>({
    initialValues,
    enableReinitialize: true,
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

      if (values?.image && values.image instanceof File) {
        formData.append('image', values.image);
      }

      const response = (await updateBooking({
        url: Endpoints.booking.update.replace('id', updateId),
        data: formData,
        invalidateTag: [apiTags.booking.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
        refetchBookingDetails();
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

  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading };
};

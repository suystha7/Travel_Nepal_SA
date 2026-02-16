import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { ReservationSchema, type reservationFormField } from '../schema/ReservationSchema';

interface IProps {
  closeModal: () => void;
}

export const useCreateReservation = ({ closeModal }: IProps) => {
  const [createReservation, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: reservationFormField = {
    type: '',
    description: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ReservationSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('description', values.description);
      formData.append('type', values.type);

      const response = (await createReservation({
        url: Endpoints?.reservation.list,
        data: formData,
        invalidateTag: [apiTags.reservation.list],
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

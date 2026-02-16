import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { useGetBreadcrumbDetails } from './useGetReservationDetails';
import { ReservationSchema, type reservationFormField } from '../schema/ReservationSchema';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdateReservation = ({ closeModal, updateId }: IProps) => {
  const [updateReservation, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading } = useGetBreadcrumbDetails({ id: updateId });

  const initialValues: reservationFormField = {
    description: data?.data?.description || '',
    type: data?.data?.type || '',
  };
  const formik = useFormik<reservationFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: ReservationSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('description', values.description);
      formData.append('type', values.type);

      const response = (await updateReservation({
        url: Endpoints.reservation.update.replace('id', updateId),
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
  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading };
};

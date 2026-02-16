import * as Yup from 'yup';

export const ReservationSchema = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  type: Yup.string().required('Type is required'),
});

export type reservationFormField = Yup.InferType<typeof ReservationSchema>;

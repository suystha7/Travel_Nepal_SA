import * as Yup from 'yup';

export const BookingSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  image: Yup.mixed().required('Image is required'),

  customer: Yup.string()
    .required('Customer is required')
    .min(3, 'Customer must be at least 3 characters'),
  customer_id: Yup.string().required('Customer ID is required'),

  service: Yup.string().required('Service is required'),
  service_id: Yup.string().required('Service ID is required'),

  is_urgent: Yup.boolean().required('Urgency flag is required'),

  booking_count: Yup.string().min(0, 'Booking count cannot be negative'),
  view_count: Yup.string().min(0, 'View count cannot be negative'),

  booking_slug: Yup.string()
    .required('Booking slug is required')
    .matches(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
});

export type bookingFormField = Yup.InferType<typeof BookingSchema>;

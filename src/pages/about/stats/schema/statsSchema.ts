import * as Yup from 'yup';

export const StatsSchema = Yup.object().shape({
  year_experience: Yup.string()
    .required('Experience is required')
    .min(1, 'Experience cannot be empty'),
  happy_travellers: Yup.string()
    .required('Happy travellers count is required')
    .min(1, 'Happy travellers count cannot be empty'),
  title: Yup.string().required('Title is required').min(1, 'Title cannot be empty'),
  description: Yup.string()
    .required('Description is required')
    .min(1, 'Description cannot be empty'),
  travel_history: Yup.string()
    .required('Travel history is required')
    .min(1, 'Travel history cannot be empty'),
  total_packages: Yup.string()
    .required('Total packages count is required')
    .min(1, 'Total packages count cannot be empty'),
});

export type statsFormField = Yup.InferType<typeof StatsSchema>;

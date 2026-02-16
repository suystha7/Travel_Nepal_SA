import * as Yup from 'yup';

export const CountrySchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  continent: Yup.string().required('Continent is required'),
  destination_type: Yup.string().required('Destination type is required'),
  image: Yup.mixed().required('Image is required'),
});

export type countryFormField = Yup.InferType<typeof CountrySchema>;

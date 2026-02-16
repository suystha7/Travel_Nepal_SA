import * as Yup from 'yup';

export const CitySchema = Yup.object().shape({
  name: Yup.string().required('City is required'),
  country_id: Yup.string().required('Country is required'),
});

export type cityFormField = Yup.InferType<typeof CitySchema>;

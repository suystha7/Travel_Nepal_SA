import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { CountrySchema, type countryFormField } from '../schema/CountrySchema';

interface IProps {
  closeModal: () => void;
}

export const useCreateCountry = ({ closeModal }: IProps) => {
  const [createCountry, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: countryFormField = {
    name: '',
    continent: '',
    destination_type: '',
    image: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: CountrySchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('continent', values.continent);
      formData.append('destination_type', values.destination_type);

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values.image);
      }

      const response = (await createCountry({
        url: Endpoints.location.country.list,
        data: formData,
        invalidateTag: [apiTags.location.country.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
        formik.resetForm();
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response.error.data.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });

  return { formik, isError, isLoading, isSuccess };
};

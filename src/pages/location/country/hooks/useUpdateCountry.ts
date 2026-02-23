import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { useGetCountryDetails } from './useGetCountryDetails';
import { CountrySchema, type countryFormField } from '../schema/CountrySchema';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdateCountry = ({ closeModal, updateId }: IProps) => {
  const [updateCountry, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading } = useGetCountryDetails({ id: updateId });

  const initialValues: countryFormField = {
    name: data?.data?.name || '',
    continent: data?.data?.continent || '',
    image: data?.data?.image || '',
    destination_type: data?.data?.destination_type || '',
  };

  const formik = useFormik<countryFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: CountrySchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('destination_type', values.destination_type);
      formData.append('continent', values.continent);

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values.image);
      }

      const response = (await updateCountry({
        url: Endpoints.location.country.update.replace(':id', updateId),
        data: formData,
        invalidateTag: [apiTags.location.country.list, apiTags.location.country.details],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return {
    formik,
    isError,
    isLoading,
    isSuccess,
    isGetDetailsLoading,
  };
};

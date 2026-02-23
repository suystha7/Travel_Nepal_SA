import { useGetDataQuery, useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { useGetCityDetails } from './useGetCityDetails';
import { CitySchema, type cityFormField } from '../schema/CitySchema';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

interface ILookupRecordCountry {
  id: string | number;
  name: string;
}

export const useUpdateCity = ({ closeModal, updateId }: IProps) => {
  const [updateCity, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading } = useGetCityDetails({ id: updateId });

  const { data: countryData } = useGetDataQuery({
    url: Endpoints.location.country.list,
    params: { p: 1, page_size: 100 },
    tag: apiTags.location.country.list,
  });

  const toOptionsCountry = (items?: ILookupRecordCountry[]) =>
    items?.map(item => ({
      label: item?.name,
      value: item?.id,
    })) || [];

  const countryOptions = useMemo(() => toOptionsCountry(countryData?.data?.records), [countryData]);

  const initialValues: cityFormField = {
    name: data?.data?.name,
    country_id: data?.data?.country?.id,
  };

  const formik = useFormik<cityFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: CitySchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('country_id', values.country_id);

      const response = (await updateCity({
        url: Endpoints.location.city.update.replace(':id', updateId),
        data: formData,
        invalidateTag: [apiTags.location.city.list, apiTags.location.city.details],
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
    countryOptions,
  };
};

import { useGetDataQuery, usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { CitySchema, type cityFormField } from '../schema/CitySchema';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
}

interface ILookupRecordCountry {
  id: number | string;
  name: string;
}

export const useCreateCity = ({ closeModal }: IProps) => {
  const [createCity, { isError, isLoading, isSuccess }] = usePostDataMutation();

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
    name: '',
    country_id: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: CitySchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('country_id', values.country_id);

      const response = (await createCity({
        url: Endpoints?.location.city.list,
        data: formData,
        invalidateTag: [apiTags.location.city.list],
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
  return {
    formik,
    isError,
    isLoading,
    isSuccess,
    countryOptions,
  };
};

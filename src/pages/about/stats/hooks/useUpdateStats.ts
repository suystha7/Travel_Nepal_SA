import { useUpdatePutDataMutation } from '@/api/api';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { useGetStatsDetails } from './useGetStatsDetails';
import { StatsSchema, type statsFormField } from '../schema/statsSchema';
import { Endpoints } from '@/api/endpoints';

export const useUpdateStats = (updateId: string) => {
  const [updateStats] = useUpdatePutDataMutation();

  const { data } = useGetStatsDetails({ id: updateId });

  const initialValues: statsFormField = {
    title: data?.data?.title || '',
    year_experience: data?.data?.year_experience || '',
    description: data?.data?.description || '',
    travel_history: data?.data?.travel_history || '',
    total_packages: data?.data?.total_packages || '',
    happy_travellers: data?.data?.happy_travellers || '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: StatsSchema,
    enableReinitialize: true,

    onSubmit: async values => {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('year_experience', values.year_experience);
      formData.append('description', values.description);
      formData.append('travel_history', values.travel_history);
      formData.append('total_packages', values.total_packages);
      formData.append('happy_travellers', values.happy_travellers);
      
      const response = (await updateStats({
        url: Endpoints.aboutUs.stats.update.replace(':id', updateId),
        data: formData,
        invalidateTag: [apiTags.aboutUs.stats.list, apiTags.aboutUs.stats.details],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
      }

      if (response?.error?.data?.message) {
        showErrorMessage(response.error.data.message);
      }

      if (response?.error?.data?.errors) {
        handleErrors(response, formik.setErrors);
      }
    },
  });

  return { formik };
};

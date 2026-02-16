import { usePostDataMutation } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { StatsSchema, type statsFormField } from '../schema/statsSchema';

export const useCreateStats = () => {
  const [createStats] = usePostDataMutation();

  const initialValues: statsFormField = {
    title: '',
    year_experience: '',
    description: '',
    travel_history: '',
    total_packages: '',
    happy_travellers: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: StatsSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('year_experience', values.year_experience);
      formData.append('description', values.description);
      formData.append('travel_history', values.travel_history);
      formData.append('total_packages', values.total_packages);
      formData.append('happy_travellers', values.happy_travellers);

      const response = (await createStats({
        url: Endpoints?.aboutUs.stats.create,
        data: formData,
        invalidateTag: [apiTags.aboutUs.stats.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
        formik.resetForm();
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

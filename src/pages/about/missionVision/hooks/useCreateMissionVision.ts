import { usePostDataMutation } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { MissionVisionSchema, type missionVisionFormField } from '../schema/MissionVisionSchema';

export const useCreateMissionVision = () => {
  const [createMissionVision] = usePostDataMutation();

  const initialValues: missionVisionFormField = {
    heading: '',
    sub_text: '',
    mission: '',
    vision: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: MissionVisionSchema,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('heading', values.heading);
      formData.append('sub_text', values.sub_text);
      formData.append('mission', values.mission);
      formData.append('vision', values.vision);

      const response = (await createMissionVision({
        url: Endpoints?.aboutUs.missionVision.create,
        data: formData,
        invalidateTag: [apiTags.aboutUs.missionVision.list],
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

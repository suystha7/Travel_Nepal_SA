import { useUpdatePutDataMutation } from '@/api/api';
// import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import handleErrors, { type ApiResponse } from '@/api/api.error';
import { MissionVisionSchema, type missionVisionFormField } from '../schema/MissionVisionSchema';
import { useGetMissionVisionDetails } from './useGetMissionVisionDetails';

export const useUpdateMissionVision = (updateId: string) => {
  const [updateMissionVision] = useUpdatePutDataMutation();

  const { data: missionVisionData, refetchMissionVisionDetails } = useGetMissionVisionDetails({
    id: updateId,
  });

  const initialValues: missionVisionFormField = {
    heading: missionVisionData?.data?.heading ?? '',
    sub_text: missionVisionData?.data?.sub_text ?? '',
    mission: missionVisionData?.data?.mission ?? '',
    vision: missionVisionData?.data?.vision ?? '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: MissionVisionSchema,
    enableReinitialize: true,
    onSubmit: async values => {
      const formData = new FormData();

      formData.append('heading', values.heading);
      formData.append('sub_text', values.sub_text);
      formData.append('mission', values.mission);
      formData.append('vision', values.vision);

      const response = (await updateMissionVision({
        url: '/mission-vision/' + updateId,
        data: formData,
        invalidateTag: [apiTags.aboutUs.missionVision.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
        refetchMissionVisionDetails();
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

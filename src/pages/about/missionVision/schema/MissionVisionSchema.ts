import * as Yup from 'yup';

export const MissionVisionSchema = Yup.object().shape({
  heading: Yup.string().required('Title is required'),
  sub_text: Yup.string().required('Sub Title is required'),
  mission: Yup.string().required('Mission is required'),
  vision: Yup.string().required('Vision is required'),
});

export type missionVisionFormField = Yup.InferType<typeof MissionVisionSchema>;

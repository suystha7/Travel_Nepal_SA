import * as Yup from 'yup';

export const PackageVideoSchema = Yup.object().shape({
  package_id: Yup.string().required('Package is required'),
  video: Yup.mixed().required('Either a video file or a URL is required'),
  video_url: Yup.string().required('Either a video file or a URL is required'),
});

export type packageVideoFormField = Yup.InferType<typeof PackageVideoSchema>;

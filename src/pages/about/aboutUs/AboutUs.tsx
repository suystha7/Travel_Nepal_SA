import { FormikProvider } from 'formik';
import AboutUsForm from './partials/AboutUsForm';
import { useGetAboutUs } from './hooks/useGetAboutUs';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { useCreateAboutUs } from './hooks/useCreateAboutUs';
import { useUpdateAboutUs } from './hooks/useUpdateAboutUs';

export const AboutUs = () => {
  const { aboutUsData, isLoading, isSuccess } = useGetAboutUs();
  const isUpdate = !!aboutUsData?.data?.id;

  const createAboutUs = useCreateAboutUs();
  const updateAboutUs = useUpdateAboutUs(aboutUsData?.data?.id || '');

  if (isLoading) return <LoadingScreen />;
  if (!isSuccess) return <ErrorMessage />;

  return (
    <div>
      <FormikProvider value={isUpdate ? updateAboutUs.formik : createAboutUs.formik}>
        <AboutUsForm isUpdate={isUpdate} />
      </FormikProvider>
    </div>
  );
};

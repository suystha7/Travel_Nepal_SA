import { FormikProvider } from 'formik';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import WhyUsForm from './partials/WhyUsForm';
import { useCreateWhyUs } from './hooks/useCreateWhyUs';
import { useUpdateWhyUs } from './hooks/useUpdateWhyUs';
import { useGetWhyUs } from './hooks/useGetWhyUs';

const WhyUs = () => {
  const { whyUsData, isLoading, isSuccess } = useGetWhyUs();
  const isUpdate = !!whyUsData?.data?.id;

  const createWhyUs = useCreateWhyUs();
  const updateWhyUs = useUpdateWhyUs(whyUsData?.data?.id || '');
  if (isLoading) return <LoadingScreen />;
  if (!isSuccess) return <ErrorMessage />;

  return (
    <div className="overflow-auto">
      <FormikProvider value={isUpdate ? updateWhyUs.formik : createWhyUs.formik}>
        <WhyUsForm isUpdate={isUpdate} />
      </FormikProvider>
    </div>
  );
};
export default WhyUs;

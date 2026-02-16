import { FormikProvider } from 'formik';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { useGetWhoWeAre } from './hooks/useGetWhoWeAre';
import { useCreateWhoWeAre } from './hooks/useCreateWhoWeAre';
import { useUpdateWhoWeAre } from './hooks/useUpdateWhoWeAre';
import WhoWeAreForm from './partials/WhoWeAreForm';

const WhoWeAre = () => {
  const { whoWeAreData, isLoading, isSuccess } = useGetWhoWeAre();
  const isUpdate = !!whoWeAreData?.data?.id;

  const createWhoWeAre = useCreateWhoWeAre();
  const updateWhoWeAre = useUpdateWhoWeAre(whoWeAreData?.data?.id || '');
  if (isLoading) return <LoadingScreen />;
  if (!isSuccess) return <ErrorMessage />;

  return (
    <div className="overflow-auto">
      <FormikProvider value={isUpdate ? updateWhoWeAre.formik : createWhoWeAre.formik}>
        <WhoWeAreForm isUpdate={isUpdate} />
      </FormikProvider>
    </div>
  );
};
export default WhoWeAre;

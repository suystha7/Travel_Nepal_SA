import { FormikProvider } from 'formik';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import StatsForm from './partials/StatsForm';
import { useGetStats } from './hooks/useGetStats';
import { useUpdateStats } from './hooks/useUpdateStats';
import { useCreateStats } from './hooks/useCreateStats';

export const Stats = () => {
  const { statsData, isLoading, isSuccess } = useGetStats();
  const isUpdate = !!statsData?.data?.id;

  const createStats = useCreateStats();
  const updateStats = useUpdateStats(statsData?.data?.id || '');

  if (isLoading) return <LoadingScreen />;
  if (!isSuccess) return <ErrorMessage />;

  return (
    <div>
      <FormikProvider value={isUpdate ? updateStats.formik : createStats.formik}>
        <StatsForm isUpdate={isUpdate} />
      </FormikProvider>
    </div>
  );
};

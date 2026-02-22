import { FormikProvider } from 'formik';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { useUpdateMissionVision } from './hooks/useUpdateMissionVision';
import MissionVisionForm from './partials/MissionVisionForm';
import { useGetMissionVision } from './hooks/useGetMissionVision';
import { useCreateMissionVision } from './hooks/useCreateMissionVision';

const MissionVision = () => {
  const { missionVisionData, isLoading, isSuccess } = useGetMissionVision();
  const isUpdate = !!missionVisionData?.data?.id;

  const createMissionVision = useCreateMissionVision();
  const updateMissionVision = useUpdateMissionVision(missionVisionData?.data?.id || '');
  if (isLoading) return <LoadingScreen />;
  if (!isSuccess) return <ErrorMessage />;

  return (
    <div className="overflow-auto">
      <FormikProvider value={isUpdate ? updateMissionVision.formik : createMissionVision.formik}>
        <MissionVisionForm isUpdate={isUpdate} />
      </FormikProvider>
    </div>
  );
};
export default MissionVision;

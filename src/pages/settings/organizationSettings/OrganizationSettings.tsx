import { FormikProvider } from 'formik';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { useGetOrganizationSettings } from './hooks/useGetOrganizationSettings';
import OrganizationSettingsForm from './partials/OrganizationSettingsForm';
import { useUpdateOrganizationSettings } from './hooks/useUpdateOrganizationSettings';
import { useCreateOrganizationSettings } from './hooks/useCreateOrganizationSettings';

export const OrganizationSettings = () => {
  const { organizationSettingsData, isLoading, isSuccess } = useGetOrganizationSettings();
  const isUpdate = !!organizationSettingsData?.data?.id;

  const createAboutUs = useCreateOrganizationSettings();
  const updateAboutUs = useUpdateOrganizationSettings(organizationSettingsData?.data?.id || '');

  if (isLoading) return <LoadingScreen />;
  if (!isSuccess) return <ErrorMessage />;

  return (
    <div className="overflow-auto">
      <FormikProvider value={isUpdate ? updateAboutUs.formik : createAboutUs.formik}>
        <OrganizationSettingsForm isUpdate={isUpdate} />
      </FormikProvider>
    </div>
  );
};

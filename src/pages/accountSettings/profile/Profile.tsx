import { FormikProvider } from 'formik';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { useGetProfile } from './hooks/useGetProfile';
import { useUpdateProfile } from './hooks/useUpdateProfile';
import ProfileForm from './partials/ProfileForm';

const Profile = () => {
  const { profileData, isLoading, isSuccess } = useGetProfile();
  const isUpdate = !!profileData?.data?.id;

  const updateProfile = useUpdateProfile(profileData?.data?.id || '');

  if (isLoading) return <LoadingScreen />;
  if (!isSuccess) return <ErrorMessage />;

  return (
    <div>
      <FormikProvider value={updateProfile.formik}>
        <ProfileForm isUpdate={isUpdate} />
      </FormikProvider>
    </div>
  );
};

export default Profile;

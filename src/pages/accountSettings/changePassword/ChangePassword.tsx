import { FormikProvider } from 'formik';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { useGetChangePassword } from './hooks/useGetChangePassword';
import ChangePasswordForm from './partials/ChangePasswordForm';
import { useCreateChangePassword } from './hooks/useCreateChangePassword';

const ChangePassword = () => {
  const { isLoading, isSuccess } = useGetChangePassword();

  const createProfile = useCreateChangePassword();

  if (isLoading) return <LoadingScreen />;
  if (!isSuccess) return <ErrorMessage />;

  return (
    <div>
      <FormikProvider value={createProfile.formik}>
        <ChangePasswordForm />
      </FormikProvider>
    </div>
  );
};

export default ChangePassword;

import { FormikProvider } from 'formik';
import ChangePasswordForm from './partials/ChangePasswordForm';
import { useCreateChangePassword } from './hooks/useCreateChangePassword';

const ChangePassword = () => {

  const createProfile = useCreateChangePassword();

  return (
    <div>
      <FormikProvider value={createProfile.formik}>
        <ChangePasswordForm />
      </FormikProvider>
    </div>
  );
};

export default ChangePassword;

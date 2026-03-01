import { FormikProvider } from 'formik'
import { useUpdateProfile } from './hooks/useUpdateProfile'
import ProfileForm from './partials/ProfileForm'
import Cookies from 'js-cookie'

const Profile = () => {
  const userId = Cookies.get('user_id') ?? ''

  const updateProfile = useUpdateProfile(userId ?? '')

  return (
    <div>
      <FormikProvider value={updateProfile.formik}>
        <ProfileForm  />
      </FormikProvider>
    </div>
  )
}

export default Profile
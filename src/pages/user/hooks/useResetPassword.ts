import { usePostDataMutation } from '@/api/api';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { useGetUser } from './useGetUser';

interface UseResetPasswordProps {
  onSuccess?: () => void;
}

export const useResetUserPassword = ({ onSuccess }: UseResetPasswordProps = {}) => {
  const [resetPassword, { isLoading }] = usePostDataMutation();
  const { userData } = useGetUser();

  const handleReset = async (email?: string) => {
    const selectedEmail = email ?? userData?.data?.records?.[0]?.email;

    if (!selectedEmail) {
      showErrorMessage('No email found for this user.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(selectedEmail)) {
      showErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = (await resetPassword({
        url: '/user/reset-password',
        data: { email: selectedEmail },
        invalidateTag: [apiTags.user.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
        onSuccess?.();
      }

      if (response?.error?.data?.message) {
        showErrorMessage(response.error.data.message);
      }

      if (response?.error?.data?.errors) {
        handleErrors(response, () => {});
      }
    } catch (error) {
      console.error(error);
      showErrorMessage('Failed to reset password');
    }
  };

  return { handleReset, isLoading };
};

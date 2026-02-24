import { useUpdateDataMutation } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';

interface IProps {
  closeModal: () => void;
  approveId: string;
}

export const useApproveReview = ({ closeModal, approveId }: IProps) => {
  const [approveReview, { isLoading }] = useUpdateDataMutation();

  const handleApprove = async () => {
    if (!approveId) return;

    try {
      const response = (await approveReview({
        url: Endpoints.reviews.update.replace(':id', approveId),
        data: { approve: true },
        invalidateTag: [apiTags.reviews.list, apiTags.reviews.details],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response.data.message);
        closeModal();
      }

      if (response?.error?.data?.message) {
        showErrorMessage(response.error.data.message);
      }
    } catch (error) {
      console.error('Error approving review:', error);
      showErrorMessage('Something went wrong while approving the review.');
    }
  };

  return { handleApprove, isLoading };
};

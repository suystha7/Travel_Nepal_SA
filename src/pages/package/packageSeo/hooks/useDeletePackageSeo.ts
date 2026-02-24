import { useDeleteDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showSuccessMessage } from '@/utils/toast';
import useDisclosure from '@/utils/useDisclosure';
import useStringState from '@/utils/useStringState';

export const useDeletePackageSeo = () => {
  const deleteModal = useDisclosure();
  const deleteIdState = useStringState('');

  const [deleteData, { isError, isLoading, isSuccess }] = useDeleteDataMutation();

  const handleDelete = async () => {
    const response = (await deleteData({
      url: Endpoints.packages.packageSeo.delete.replace(':id', deleteIdState.values),
      invalidates: [apiTags.packages.packageSeo.list],
    })) as ApiResponse;
    if (response?.data?.message) {
      showSuccessMessage(response?.data?.message);
      deleteModal.close();
    }
  };

  return { deleteModal, deleteIdState, isError, isLoading, isSuccess, handleDelete };
};

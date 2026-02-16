import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import useStringState from '@/utils/useStringState';
import type { StatsDetailsResponse } from '../interface/IStats';
import useDisclosure from '@/utils/useDisclosure';

export const useGetStats = () => {
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const updateId = useStringState();

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: StatsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints?.aboutUs.stats.list,
    tag: apiTags.aboutUs.stats.list,
  });

  return {
    statsData: data,
    isError,
    isLoading,
    isSuccess,
    createModal,
    updateModal,
    updateId,
  };
};

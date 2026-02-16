import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import useStringState from '@/utils/useStringState';
import useDisclosure from '@/utils/useDisclosure';
import type { AboutUsDetailsResponse } from '../interface/IAboutUs';

export const useGetAboutUs = () => {
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const updateId = useStringState();

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: AboutUsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints?.aboutUs.about.list,
    tag: apiTags.aboutUs.about.list,
  });

  return {
    aboutUsData: data,
    isError,
    isLoading,
    isSuccess,
    createModal,
    updateModal,
    updateId,
  };
};

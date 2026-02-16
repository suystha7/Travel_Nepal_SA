import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import useStringState from '@/utils/useStringState';
import useDisclosure from '@/utils/useDisclosure';
import type { OrganizationSettingsDetailsResponse } from '../interface/IOrganizationSetting';

export const useGetOrganizationSettings = () => {
  const createModal = useDisclosure();
  const updateModal = useDisclosure();
  const updateId = useStringState();

  const { data, isError, isLoading, isSuccess } = useGetDataQuery<{
    data: OrganizationSettingsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints?.settings.organizationSettings.list,
    tag: apiTags.settings.organizationSettings.list,
  });

  return {
    organizationSettingsData: data,
    isError,
    isLoading,
    isSuccess,
    createModal,
    updateModal,
    updateId,
  };
};

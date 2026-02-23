import { useGetDataQuery } from '@/api/api';
import type { OrganizationSettingsDetailsResponse } from '../interface/IOrganizationSetting';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetOrganizationSettingsDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: OrganizationSettingsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.settings.organizationSettings.details.replace(':id', id),
    tag: apiTags.settings.organizationSettings.details
  });

  return { data, isLoading, isError, isSuccess };
};

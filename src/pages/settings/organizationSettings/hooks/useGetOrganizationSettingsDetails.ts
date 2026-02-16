import { useGetDataQuery } from '@/api/api';
import type { OrganizationSettingsDetailsResponse } from '../interface/IOrganizationSetting';
import { Endpoints } from '@/api/endpoints';

interface IProps {
  id: string;
}

export const useGetOrganizationSettingsDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchOrganizationSettingsDetails,
  } = useGetDataQuery<{
    data: OrganizationSettingsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.settings.organizationSettings.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchOrganizationSettingsDetails };
};

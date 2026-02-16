import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { SocialMediaSettingsDetailsResponse } from '../interface/ISocialMediaSetting';

interface IProps {
  id: string;
}

export const useGetSocialMediaDetails = ({ id }: IProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: SocialMediaSettingsDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.settings.socialMedia.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess };
};

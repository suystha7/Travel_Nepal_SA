import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { SocialMediaSettingsDetailsResponse } from '../interface/ISocialMediaSetting';
import { apiTags } from '@/constants/tag';

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
    url: Endpoints.settings.socialMedia.details.replace(':id', id),
    tag: apiTags.settings.socialMedia.details
  });

  return { data, isLoading, isError, isSuccess };
};

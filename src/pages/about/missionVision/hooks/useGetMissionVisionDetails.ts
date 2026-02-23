import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { MissionVisionDetailsResponse } from '../interface/IMissionVision';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetMissionVisionDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: MissionVisionDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.aboutUs.missionVision.details.replace(':id', id),
    tag: apiTags.aboutUs.missionVision.details,
  });

  return { data, isLoading, isError, isSuccess };
};

import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { MissionVisionDetailsResponse } from '../interface/IMissionVision';

interface IProps {
  id: string;
}

export const useGetMissionVisionDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchMissionVisionDetails,
  } = useGetDataQuery<{
    data: MissionVisionDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.aboutUs.missionVision.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchMissionVisionDetails };
};

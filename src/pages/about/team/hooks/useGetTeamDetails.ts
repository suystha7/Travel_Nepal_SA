import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { TeamDetailsResponse } from '../interface/ITeam';

interface IProps {
  id: string;
}

export const useGetTeamDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchTeamDetails,
  } = useGetDataQuery<{
    data: TeamDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.aboutUs.team.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess, refetchTeamDetails };
};

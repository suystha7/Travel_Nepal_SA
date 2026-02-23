import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { TeamDetailsResponse } from '../interface/ITeam';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetTeamDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: TeamDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.aboutUs.team.details.replace(':id', id),
    tag: apiTags.aboutUs.team.details,
  });

  return { data, isLoading, isError, isSuccess };
};

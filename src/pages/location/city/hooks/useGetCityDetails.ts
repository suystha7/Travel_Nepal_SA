import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { CityDetailsResponse } from '../interface/ICity';

interface IProps {
  id: string;
}

export const useGetCityDetails = ({ id }: IProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: CityDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.location.city.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess };
};
